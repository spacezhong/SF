let express=require("express");
let app=express();
let post=9000;//端口号
let fs=require('fs');
let crypto=require('crypto');//此中间件用于加密
let bodyParser=require('body-parser');//此中间件用于解析请求体
let session=require('express-session');
let homeSwipe=require('./data/home/swipe');
let homeCategory=require('./data/home/category');
let homeHeadline=require('./data/home/headline');
let homeDiscount=require('./data/home/discounts');
let homeList=require('./data/home/lists');
let kind=require('./data/kind/kind');
let searchHotData=require('./data/search/searchHot');
let filterData=require('./data/filter/filter');

app.use(session({
    resave:true,//当客户端并行发送多个请求时，是否允许其中一个请求在另一个请求结束时，对session进行修改覆盖，并保存；
    saveUninitialized:true,//初始化session时，是否保存到存储；
    secret:"six",//表示服务器端生成的session签名；
}));
//跨域响应头
app.use((req,res,next)=>{
    //服务器允许访问的网
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

//code:0表示成功，code:1表示失败；

//获取home页的数据：
app.get('/home/swipe',(req,res)=>{
    homeSwipe.length?
        res.json({code:0,success:'获取数据成功',homeSwipe})
        :res.json({code:1,error:'请检查后台接口'})
});
app.get('/home/category',(req,res)=>{
    homeCategory.length?
    res.json({code:0,success:'获取数据成功',homeCategory})
    :res.json({code:1,error:'请检查后台接口'})
});
app.get('/home/headline',(req,res)=>{
    homeHeadline.length?
        res.json({code:0,success:'获取数据成功',homeHeadline})
        :res.json({code:1,error:'请检查后台接口'})
});
app.get('/home/discount',(req,res)=>{
    homeDiscount.length?
        res.json({code:0,success:'获取数据成功',homeDiscount})
        :res.json({code:1,error:'请检查后台接口'})
});
app.get('/home/list/:offset/:limit',(req,res)=>{
    let {offset,limit}=req.params;
    offset=parseInt(offset);
    limit=parseInt(limit);
    if(homeList.length){
        let listData=homeList.slice(0,offset+limit);
        let hasMore=offset+limit>homeList.length?false:true;
        let loadingText=offset+limit>homeList.length?'加载完毕':'加载中';
        res.json({code:0,success:'获取数据成功',hasMore,loadingText,listData});
    }else{
        res.json({code:1,error:'请检查后台接口'})
    }
});

//获取kind页数据：
app.get('/kind',(req,res)=>{
    kind.length?
        res.json({code:0,success:'获取数据成功',kind})
        :res.json({code:1,error:'请检查后台接口'})
});

//定义读取数据的read方法：
let read=(url,cb)=>{
    fs.readFile(url,'utf-8',(err,data)=>{
        if(err || data.length===0){
            return cb([])
        }else{
            console.log(data);
            cb(JSON.parse(data));
        }
    });
};
//定义写入数据的write方法：
let write=(url,data,cb)=>{
    fs.writeFile(url,JSON.stringify(data),cb)
};
//获取search页数据：
app.get('/search',(req,res)=>{
     let {value}=req.query;
     //第一步：先去home页面的主数据中过滤出含有input框输入值的那些项，如果有就返回相关的项：
     if(value.length>0){
         let findSearchArray=homeList.filter((item)=>item.recommendTitle.includes(value))||[];
         console.log(findSearchArray);
         findSearchArray.length>0
             ?res.json({code:0,success:'成功获取搜索数据',data:findSearchArray})
             :res.json({code:1,err:'无相关结果'})
     }else{
         res.json({code:1,err:'无相关结果'})
    }
     //第二步：再去已有的搜索文件夹中，查找是否有input框输入值的项，如果没有，就把input框的输入值和原来搜索文件夹
     //的值组合成新的数据，重新写入到原来的搜索文件夹;
     //注意搜索文件夹最开始是[];
     value&&read('./data/search/search.json',(data)=>{//cb函数要直接写在这里，为了拿到函数里的value值；
         console.log(data);// data=[]:初始值为[]
         let flag=data.some((item)=>item===value);//flag为true/false,是去找数组里有没有等value值相等的值，一旦找到，就停止查找
         if(!flag){
             data=[...data,value];//data=['牛奶']；
             console.log(data);//
             write('./data/search/search.json',data,()=>{//将新的数据写入到原来的搜索记录中
                 console.log('写入搜索历史记录成功');
             })
         }
     });
 });
app.get('/hotSearch',(req,res)=>{
    searchHotData.length?
            res.json({code:0,success:'获取数据成功',searchHotData})
            :res.json({code:1,err:'获取数据失败'})
});
app.get('/searchHistory',(req,res)=>{
     let type=req.query.type;
     let cb=(data)=>{
         if(type==='undefined'){
             res.json({code:0,success:'成功获取到历史记录',data})
         }else{
             write('./data/search/search.json',[],()=>{
                 res.json({code:0,success:'清除历史记录成功'})
             })
         }
     };
     read('./data/search/search.json',cb);
 });
//获取lists页的数据：
app.get('/classification/:title',(req,res)=>{
    let {title}=req.params;
    if(title){
        let list=homeList.filter((item)=>(item.classification===title));//先按照title去过滤出符合的项，返回值为数组
        res.json({code:0,success:'获取数据成功',list})
    }else{
        res.json({code:1,err:'请检查接口'})
    }
});
//获取filterData的数据：
app.get('/filterData',(req,res)=>{
    Object.keys(filterData).length>0?
    res.json({code:0,success:'获取数据成功',filterData})
    :res.json({code:1,err:'获取数据失败'})
});
//获取detail页的数据：
app.get('/detail/:id',(req,res)=>{
    let {id}=req.params;
    let detailList=homeList.filter((item)=>(item.recommendID===id));
    detailList.length?res.json({code:0,success:'获取数据成功',detailList})
        :res.json({code:1,err:'获取数据失败'})
});
//注册：
app.use(bodyParser.json());//app.use方法，第一个参数是路径，如果没有，默认就是/,一旦匹配上，就让bodyParser.json()执行；
app.post('/reg',(req,res)=>{
    let {username,password}=req.body;
    read('./data/personal/personal.json',data=>{
        let newUser=data.find(item=>item.username===username);//这里使用用户名，因为如果此项存在，那么密码是加密过的密码，不能使用
        if(newUser){
            res.json({code:1,error:'用户名已经存在'});
        }else{
            password=crypto.createHash('md5').update(password).digest('hex');
            data.push({username,password});
            let write=(url,data,cb)=>{
                fs.writeFile(url,JSON.stringify(data),cb);
            };
            write('./data/personal/personal.json',data,()=>{
                res.json({code:0,success:'注册成功'});
            });
        }
    })
});
//登录：
app.post("/login",(req,res)=>{
    let user=req.body;
    let {username,password}=user;
    password=crypto.createHash("md5").update(password).digest("hex");
    read("./data/personal/personal.json",userInfos=>{
        let newUser=userInfos.find(item=>item.username===user.username);
        if(newUser){
            if(newUser.password===password){
                req.session.user=newUser;
                console.log(req.session);
                res.send({code:0,success:"登录成功",user});
            }else if(newUser.password!==password) {
                res.send({code:1,error:"密码错误"});

            }
        }else {
                res.send({code:2,error:"用户不存在,请先注册"})
        }
    })
});
//在个人中心页，需要先判断用户是否登录：
//判断是否登录
//登录时，req.session.user的挂载未实现
app.get("/validate",(req,res)=>{
    console.log(req.session.user);
    if(req.session.user){
        console.log(req.session);
        res.json({code:0,success:"用户已登录",user:req.session.user})
    }else{
        res.json({code:1,error:"此用户未登录"})
    }
});

//更改密码：
app.post('/changePassword',(req,res)=>{
    let {username,password,newPasswordFirst}=req.body;
    password=crypto.createHash('md5').update(password).digest('hex');
   read('./data/personal/personal.json',data=>{
       let newUser=data.find(item=>item.username===username);
       if(newUser&&newUser.password===password){
          let  newPassword=crypto.createHash('md5').update(newPasswordFirst).digest('hex');
          let newData= data.map(item=>{
               if(item.username===username){
                   return {username,password:newPasswordFirst}
               }else{
                   return item;
               }
           });
           write('./data/personal/personal.json',newData,()=>{
               res.json({code:0,success:'修改密码成功',username,password:newPasswordFirst});
           });
       }else{
           res.json({code:1,error:'原始密码错误'})
       }
   });
});
//退出登录：
app.use('/loginOut',(req,res)=>{
    req.session.user=null;
    res.json({code:0,success:'退出登录成功'})
});
//注销：
app.post('/writeOff',(req,res)=>{
    let {username,password}=req.body;
    console.log(username, password);
    read('./data/personal/personal.json',data=>{
        let newUser=data.find(item=>item.username===username);
        data=data.filter(item=>{
            return item.username!==username;
        });
        write('./data/personal/personal.json',data,()=>{
            res.json({code:0,success:'注销成功'});
        });
    })
});
//用户点击‘加入购物车’,将前端传过来的信息obj,加入到后台购物车文件中：
//obj为：{
//             flag:true,
//             goodsNum:goodsNum,
//              num:this.props.num,
//             username:username || '',
//             selected:true,
//              recommendID,
//         }
app.post('/addCart',(req,res)=>{//注意goodsNum是总数量
    let newLists;
   if(!req.body){
       return res.sendStatus(400);
   }else{
       let {username,goodsNum,selected,recommendID,num}=req.body;
       console.log(username);
       let product=homeList.find(item=>item.recommendID===recommendID);//在商品数据中找到该商品
       read('./data/cart/cart.json',(data)=>{
           let oldCart=data.find(item=>item.username===username);
           if(oldCart){//表明用户之前,已经添加过商品到购物车了
               //找到购物车数据中，此用户的数据的和recommendID相同的那一项：
               let oldInfo=oldCart.lists.find(item=>item.recommendID===recommendID);
               if(oldInfo){//表明用户已经在购物车添加过当前详情页的这项了，给这项改goodsNum,selected:true
                   oldInfo.num=oldInfo.num+num;
                   oldInfo.selected=selected;
               }else{//用户之前没添加过这项，需写入此项
                   product.num=num;
                   product.selected=selected;
                   oldCart.lists.push(product);
               }
               newLists=oldCart.lists;
           }else{//说明之前没有添加过购物车
               product.num=num;
               product.selected=selected;
               let newCart={username,lists:[product]};
               console.log(newCart);
               data=[...data,newCart];
               //[ { username: 'aaaaaa', lists: [ [Object] ] } ]
               newLists=newCart.lists;
           };
           console.log(data);
           write('./data/cart/cart.json',data,()=>{
               res.json({code:0,success:'添加到购物车成功',lists:newLists});//数据需要返回吗，是不是可以不用返回；
           })
       });
   }
});
//详情页刚加载，就去查看购物车信息：
app.get('/findCart',(req,res)=>{
    let {username}=req.query;
    if(username){
        read('./data/cart/cart.json',data=>{
            let info=data.find(item=>item.username===username);
            if(info){//说明用户之前登录后，有加入商品
                let lists=info.lists;
                res.json({code:0,success:'此用户有添加过商品',lists})
            }else{//说明用户之前登录后，没有添加商品
                res.json({code:1,success:'此用户没添加过商品'})
            }
        })
    }
});
//用户注销时，去清空此用户的购物车：
app.get('/writeOffCart',(req,res)=>{
   let {username}=req.query;
    read('./data/cart/cart.json',data=>{
        let info=data.find(item=>item.username===username);
        if(info){
            data=data.filter(item=>{
                return item.username!==username;
            });
            write('./data/cart/cart.json',data,()=>{
                res.json({code:0,success:'注销清空用户购物车成功'})
            })
        }else{
            res.json({code:1,error:'此用户没加入商品到购物车，不需要清空'})
        }
    });
});
//用户点击收藏时,收藏这一项：
app.post('/addCollect',(req,res)=>{
    if(!req.body)return res.sendStatus(400);
    let {username,recommendID,collect}=req.body;
    let product=homeList.find(item=>item.recommendID===recommendID);
    read('./data/collect/collect.json',data=>{
        let lists;
        let oldCollect=data.find(item=>item.username===username);
        if(oldCollect){//有此用户名
            let info=oldCollect.lists.find(item=>item.recommendID===recommendID);
            if(info) { //已经收藏了

            }else{//还没有收藏
                product.collect=true;
                 oldCollect.lists.push(product);
            }
             lists=oldCollect.lists;
        }else{//用户还没有加过收藏,需将用户和商品加入收藏信息
            product.collect=true;
            let newInfo={username,lists:[product]};
            data.push(newInfo);
             lists=[product];
        }
        write('./data/collect/collect.json',data,()=>{
            res.json({code:0,success:'写入收藏成功',lists:lists})
        })
    })
});
//页面首次加载，去获取收藏信息：
app.get('/findCollect',(req,res)=>{
    let {username}=req.query;
    read('./data/collect/collect.json',data=>{
        let info=data.find(item=>item.username===username);
        if(info){
            let lists =info.lists;
            console.log(lists);
            res.json({code:0,success:'获取收藏信息成功',lists});
        }else{
            res.json({code:1,error:'用户还没有收藏信息'})
        }
    });
});
//收藏页面
app.get('/collect',(req,res)=>{
    let {username}=req.query;
    read('./data/collect/collect.json',data=>{
        let info=data.find(item=>item.username===username);
        if(info){
            let lists=info.lists;
            res.json({code:0,success:'获取收藏信息成功',lists})
        }else{
            res.json({code:1,error:'您还没有收藏信息'})
        }
    })
});

//取消收藏
app.get('/cancelCollect',(req,res)=>{
    let {username,recommendID}=req.query;
    read('./data/collect/collect.json',data=>{
        let info=data.find(item=>item.username===username);
        if(info){
            info.lists=info.lists.filter(item=>item.recommendID!==recommendID);
            data=data.map(item=>item.username===username?info:item);
            write('./data/collect/collect.json',data,()=>{
                res.json({code:0,success:'取消收藏成功'});
                console.log(data);
            })
        }
    })
});

//更新购物车数量
app.post('/updateCart',(req,res)=>{//注意goodsNum是总数量
    console.log(req.body);
    let newLists;
    if(!req.body){
        return res.sendStatus(400);
    }else{
        let {username,selected,recommendID,num}=req.body;
        let product=homeList.find(item=>item.recommendID===recommendID);//在商品数据中找到该商品
        read('./data/cart/cart.json',(data)=>{
            let oldCart=data.find(item=>item.username===username);
            if(oldCart){
                //表明用户之前,已经添加过商品到购物车了
                //找到购物车数据中，此用户的数据的和recommendID相同的那一项：
                let oldInfo=oldCart.lists.find(item=>item.recommendID===recommendID);
                if(oldInfo){//表明用户已经在购物车添加过当前详情页的这项了，给这项改goodsNum,selected:true
                    oldInfo.num=num;
                    oldInfo.selected=selected;
                }else{//用户之前没添加过这项，需写入此项
                   // product.num=num;
                  //  product.selected=selected;
                  //  oldCart.lists.push(product);
                }
                newLists=oldCart.lists;
            }else{//说明之前没有添加过购物车

            };
            console.log(data);
            write('./data/cart/cart.json',data,()=>{
                res.json({code:0,success:'添加到购物车成功',lists:newLists});//数据需要返回吗，是不是可以不用返回；
            })
        });
    }
});
//删除购物车某一商品：
app.post('/deleteCartInfo',(req,res)=>{
    if(!req.body) return res.sendStatus(400);
    let {username,recommendID}=req.body;
    read('./data/cart/cart.json',data=>{
       let info= data.find(item=>item.username===username);
       if(info) {
           info.lists = info.lists.filter(item => item.recommendID !== recommendID);
           data=data.map(item=>(item.username===username?info:item));
           write('./data/cart/cart.json',data,()=>{
               res.json({code:0,success:'删除此条购物车信息成功',lists:info.lists})
           })
       }
    })
});
//全部清空
app.get('/deleteCartInfo',(req,res)=>{
    let {username}=req.query;
    read('./data/cart/cart.json',data=>{
        let info=data.find(item=>item.username===username);
        data=data.map(item=>(item.username!==username?item:{...info,lists:[]}));
        write('./data/cart/cart.json',data,()=>{
            res.json({code:0,success:'清空全部购物车成功',lists:[]});
        });
    });
});
app.listen(post,()=>console.log(`端口${post}监听成功`));



