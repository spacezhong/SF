let path=require("path");
let HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
    entry:"./src/index.js",
    output:{
        path:path.resolve("build"),
        filename:"bundle.js"
    },
    //可以在控制台看报错
    devtool:"cheap-module-source-map",
    // devServer:{
    //     //如果请求的是 /api 开头的话 用9000 来代理
    //   proxy:{
    //       "/api":"http://localhost:9000"
    //   }
    // },
    module:{
        rules:[
            {test:/\.js$/,loader:"babel-loader",query:{presets:["es2015","stage-0","react"]},exclude:/node_modules/},
            {
                test:/\.css$/,
                loaders:["style-loader","css-loader"]
            },
            {
                test:/\.less$/,
                loaders:["style-loader","css-loader","less-loader"]
            },
            {test:/\.(eot|svg|woff2|wtf|ttf|woff)$/,loader:"url-loader"},
            {
                test:/\.(jpg|png|gif)$/,
                loader:"url-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"index.html"
        })
    ]
};