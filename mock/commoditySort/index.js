module.exports=function(commodityData,type) {
    if(type=="price") {
        commodityData = commodityData.sort((a, b) => {
            return parseInt(a.recommendPrice) - parseInt(b.recommendPrice)
        })
    }else if(type=="comment"){
        commodityData = commodityData.sort((a, b) => {
            return parseInt(b.graphicComment) - parseInt(a.graphicComment)
        })
    }
    return  commodityData;
};
