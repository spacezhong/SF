let express=require("express");
let app=express();
let fs=require("fs");
let uuid=require("uuid");// 唯一字符串
let bodyParser=require("body-parser");//读取请求体里面的数据
let post=8000;//端口号
let session=require("express-session"); //session

let crpyto=require("crypto");//加密

let retrievData=require("./retrievData/index"); //获取数据执行的函数

let commoditySort=require("./commoditySort/index");//商品排序

let read=(url,cb)=>{
    fs.readFile(url,"utf-8",(err,data)=>{
        if(err||data.length===0) return cb([]);
        cb(JSON.parse(data))
    });
}; //读数据方法
let write=(url,data,cb)=>{
    fs.writeFile(url,JSON.stringify(data),cb)
}; //写数据方法

app.use(session({
        resave:true,
        saveUninitialized:true,
        secret:"six"
    }));

// let jsonParser = bodyParser.json();//获取  JSON 编码的请求体
// let urlencodedParser = bodyParser.urlencoded({ extended: false });//获取 URL编码的请求体

let homeDatas=require("./data/Static/swiper");//轮播数据+导航(10条)

let hotSearch=require("./data/Static/hotSearch");//搜索热门的关键词

let listDatas=require("./data/Static/list"); //获取列表分类数据

app.use(bodyParser.json());

//跨域响应头
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:8080");
    //服务器允许客户发送的请求方式
    res.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT");
    //服务器允许的请求头
    res.header("Access-Control-Allow-Headers","Content-Type,Accept");
    //允许客户端把cookie发送过来
    res.header("Access-Control-Allow-Credentials","true");
    //如果请求的方法是OPTIONS  那就意味着客户端只要响应头,直接结束响应
    if(req.method==="OPTIONS"){
        res.end();
    }else{
        next();
    }
});
//所有请求 success成功1 失败0
//首页
///home/carousel  轮播数据+导航(10条)+会员+秒杀
app.get("/home/carousel",(req,res)=>{//轮播图，已获取
    Object.keys(homeDatas).length>0?res.send({homeDatas,code:0,success:"获取数据成功"}):res.send({code:1,error:"获取数据失败,检查接口"});
});
//给评论加id
let getComment=(res,data,next)=>{
    read("./data/Content/comment.json",comment=>{
        if(!comment[comment.length-1].commentID){
            comment.forEach((item,index)=>item.commentID=data[index].recommendID);
            write("./data/Content/comment.json",comment,()=>{
                res.comment=comment;
                next();
            })
        }else {
            res.comment=comment;
            next();
        }
    });
};
//获取列表数据 并且加上id属性
app.use("/public",(req,res,next)=>{
    read("./data/Content/mainData.json",data=>{
        if(!data[data.length-1].recommendID){
           data.forEach((item,index)=>item.recommendID=uuid.v4());
            write("./data/Content/mainData.json",data,()=>{
                getComment(res,data,next);
                res.data=data;
           })
       }else {
            res.data=data;
            getComment(res,data,next);
       }
    });
});

///home/recommend  推荐  分类页  内容 recommend , 判断条件 flag 请求参数offset
app.get("/public/recommend",(req,res)=>{//为你推荐，已获取
    retrievData(req,res,res.data);//每次获取4条数据
});

// list 列表页面
app.get("/list",(req,res)=>{
    listDatas.length>0?res.send({code:0,success:"成功获取列表页数据",listDatas}): res.send({code:1,error:"获取数据失败"})
});

//点击了classification，跳到某种类商品的列表页，获取数据，用keyWord获取指定种类的商品，type未传参，仅仅是获取数据；点击进行排序时，用keyWord重新获取指定种类的商品，用type进行排序，type来自<Filter>组件的data-type
app.get("/public/classification",(req,res)=>{
    let keyWord=req.query.keyWord||"";
    let type=req.query.type;
    console.log(keyWord, type);

    if(keyWord.length>0){
        let classifications=res.data.filter(item=>item.classification===keyWord);
        type?classifications=commoditySort(classifications,type):null;//传了type，就是排序，根据type类型进行排序，未传type,就是获取某一类的数据
        res.send({code:0,classifications,success:"成功获取分类页数据",type});
    }else {
        res.send({code:1,err:"访问错误请检查路径参数"});
    }
});

// 商品详情页 details   该商品details 类似similar  评论comment
app.get("/public/details",(req,res)=>{
      let id=req.query.id;
      let details=res.data.find(item=>item.recommendID===id);
          if(details){
              let similar=res.data.filter
              (item=>item.classification===details.classification).slice(0,4);
              let comment=res.comment.find(item=>item.commentID===id);
              res.send({code:0,details,similar,comment,success:"成功获取数据"})
          }else {
              res.send({code:1,err:"输入的参数有误"})
          }
});

//搜索 search    传参 关键字 keyWords 排序
app.get("/public/search",(req,res)=>{
    let keyWord=req.query.keyWord||"";
    let type=req.query.type;
    keyWord&&read("./data/Content/historical.json",historical=>{
        let flag =historical.some(item=>item===keyWord);
        if(!flag){
            historical=[...historical,keyWord];
            write("./data/Content/historical.json",historical,()=>{
                console.log("写入成功");
            })
        }
    });
    if(keyWord.length>0){
           let searchs=res.data.filter(item=>item.recommendTitle.includes(keyWord))||[];
               type?searchs=commoditySort(searchs,type):null;
               searchs.length>0? res.send({code:0,success:"成功获取搜索数据",searchs}):  res.send({code:1,error:"抱歉,您搜索的商品未找到!"});
       }else {
        res.send({code:1,error:"抱歉,您搜索的商品未找到!"});
    }
});
//public/cart 添加购物车    修改数量
app.post("/public/cart",(req,res)=>{
    if (!req.body) return res.sendStatus(400);
    let {username,recommendID,count,selected}=req.body;
    console.log(username, recommendID, count,"=======");
    let info=res.data.find(item=>item.recommendID==recommendID); //商品
    let newList;
    read("./data/Content/userCommodity.json",userCommodities=>{//是一个回调函数，userCommodities是JSON.parse(data)
        let oldCart=userCommodities.find(item=>item.username==username);
        if(oldCart){
            let oldInfo=oldCart.list.find(item=>item.recommendID==info.recommendID);
            if(oldInfo){
                oldInfo.count = count;
                oldInfo.selected = selected;
            }else {

                info.count = count;
                info.selected = selected;
                oldCart.list.push(info);
            }
            newList = oldCart.list;
        }else {
            info.count = count;
            info.selected = true;
            let newCart={username,list:[info]};
            userCommodities=[...userCommodities,newCart];
            newList = newCart.list;
        }
        write("./data/Content/userCommodity.json",userCommodities,()=>{
            res.json({code:0,success:"写入完成",data:newList})
        })
    });
});

//删除购物车
//删除购物车 删除某一项 post请求，需要传的参数：username,recommendID
//先通过username找到这条数据
//找到返回true 过滤这条数据的list：[{id},{id}]，根据ID删除这一项(对象)，返回删除后的新数组
//遍历数据库中的数据，通过username找到那一项数据，把它替换成删除后的那一项 ，写入数据库。
app.post("/removeCart",(req,res)=>{
    if (!req.body) return res.sendStatus(400);
    let {username,recommendID}=req.body;
    read("./data/Content/userCommodity.json",userCommodities=>{
        let userCommoditie=userCommodities.find(item=>item.username==username);//先通过userName找到这条数据
        if(userCommoditie){//找到返回true 过滤这条数据的list：[{id},{id}]，根据ID删除这一项(对象)，返回删除后的新数组
            userCommoditie.list=userCommoditie.list.filter(key=>key.recommendID!=recommendID);
            //遍历数据库中的数据，通过userName找到那一项数据，把它替换成删除后的那一项
            userCommodities.map(item=>item.username==username?userCommoditie:item)
            write("./data/Content/userCommodity.json",userCommodities,()=>{
                console.log(userCommoditie.list);
                res.send({code:0,success:"删除成功",shopData:userCommoditie.list})
            })
        }else {
            res.send({code:1,error:"没有找到该商品"})
        }
    })
});

//清空购物车
app.get("/emptiedCart",(req,res)=>{
    let username=req.query.username;
    console.log(username);
    if (!req.query.username) return res.sendStatus(400);
    read("./data/Content/userCommodity.json",userCommodities=>{
        userCommodities=userCommodities.filter(item=>item.username!=username)
        write("./data/Content/userCommodity.json",userCommodities,()=>{
            res.send({code:0,success:"成功清空购物车"})
        })
    })
});

//查看购物车返回购物车信息
app.get("/findCart",(req,res)=>{
    let username=req.query.username;
    if (!req.query.username) return res.sendStatus(400);
    read("./data/Content/userCommodity.json",userCommodities=>{
       let userCommoditie=userCommodities.find(item=>item.username==username);
        if(userCommoditie){
           res.send({code:0,success:"查看购物车成功",userCommoditie})
        }else {
            res.send({code:1,error:"查看购物车失败"})

        }
    })
});

//搜索 search    传参 关键字 keyWords 排序
app.get("/public/search",(req,res)=>{
    let keyWord=req.query.keyWord||"";
    console.log(keyWord);
    let type=req.query.type;
    keyWord&&read("./data/Content/historical.json",historical=>{
        let flag =historical.some(item=>item===keyWord);
        if(!flag){
            historical=[...historical,keyWord];
            console.log(historical);
            write("./data/Content/historical.json",historical,()=>{
                console.log("写入成功");
            })
        }
    });
    if(keyWord.length>0){
        let searchs=res.data.filter(item=>item.recommendTitle.includes(keyWord))||[];
        type&&searchs.length>0?searchs=commoditySort(searchs,type):null;
       searchs.length>0? res.send({code:0,success:"成功获取搜索数据",searchs}):res.send({code:1,error:"抱歉,您搜索的商品未找到!"});
    }else {
        res.send({code:1,error:"抱歉,您搜索的商品未找到!"});
    }
});
//热门搜索
app.get("/hotSearch",(req,res)=>{
    hotSearch.length>0?res.send({code:0,success:"成功获取列表页数据",hotSearch}): res.send({code:1,error:"获取数据失败"})
});

//获取历史纪录和清空历史记录
app.get("/historical",(req,res)=>{
    let type=req.query.type;
    read("./data/Content/historical.json",historical=>{
        if(type=="undefined"){
            res.send({code:0,success:"成功获取历史记录",historical})
        }else{
            console.log("呵呵");
            write("./data/Content/historical.json",[],()=>{
                res.send({code:0,success:"清除历史记录成功"})
            })
        }
    })
});
//注册  前后台成功
app.post("/reg",(req,res)=>{
    let user=req.body;
    console.log(user,"====");
    read("./data/Content/userInfo.json",userInfos=>{
        let newUser=userInfos.find(item=>item.username==user.username);
        if(newUser){
            res.send({code:1,error:"用户名已经存在请重新输入"})
        }else {
            user.password=crpyto.createHash("md5").update(user.password).digest("hex");
            console.log("=====aaaaa");
            userInfos.push(user);
            write("./data/Content/userInfo.json",userInfos,()=>{
                res.send({code:0,success:"注册成功"})
            })
        }
    })
});
//登录  前后台成功
app.post("/login",(req,res)=>{
    let user=req.body;
    user.password=crpyto.createHash("md5").update(user.password).digest("hex");
    read("./data/Content/userInfo.json",userInfos=>{

        let newUser=userInfos.find(item=>item.username==user.username);
        if(newUser){
            if(newUser.password==user.password){
                req.session.user=newUser;
                res.send({code:0,error:"登录成功",user});
            }else if(newUser.password!==user.password) {
                res.send({code:1,error:"密码错误"})
            }
        }else {
            res.send({code:2,error:"用户不存在"})
        }
    })
});
//退出
app.get("/logout",(req,res)=>{
    req.session.user=null;
    console.log("======");
    res.send({code:0,success:"退出成功"})
});
//判断是否登录
app.get("/validate",(req,res)=>{
    console.log(req.session.user);
    if(req.session.user){
        res.send({code:0,success:"用户已经登录",user:req.session.user})
    } else {
        res.send({code:1,error:"此用户未登录"})
    }
});
//修改密码
app.post("/changepassword",(req,res)=>{
    let {user,newpassword}=req.body;
    console.log(user, newpassword);
    read("./data/Content/userInfo.json",userInfos=>{
        let newUser=userInfos.find(item=>item.username==user.username);// 找到用户
        user.password=crpyto.createHash("md5").update(user.password).digest("hex");
        if(newUser.password==user.password){  //判断密码 是否一样
            newUser.password=crpyto.createHash("md5").update(newpassword).digest("hex");
            userInfos.map(item=>{
                return  item.username==newUser.username?newUser:item;
            });
            write("./data/Content/userInfo.json",userInfos,()=>{
                res.send({code:0,success:"修改密码成功"});
            });
        }else{
            res.send({code:1,error:"密码错误"});
        }
    })
});

//公共
app.all("*",(req,res)=>{res.end("not find")});
app.listen(post,()=>console.log(`端口${post}监听成功`));
