module.exports=function(req,res,data){
    let {offset=0,limit=4}=req.query;
    let hasMore=true;
    offset=isNaN(offset)?0:parseInt(offset);
    limit=isNaN(limit)?0:parseInt(limit);
    let recommend=JSON.parse(JSON.stringify(data));
    recommend=recommend.filter(item=>item.productsFeatured);
    hasMore=offset+limit>=recommend.length?false:hasMore;
    recommend=recommend.slice(offset,limit+offset);
    res.send({recommend,hasMore});
};
