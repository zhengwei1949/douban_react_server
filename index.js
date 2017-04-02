const express=require('express')
const request = require('request')
const app=express()

// 实现cors跨域
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

// 请求电影列表的数据
app.get('/getMovieListData',function (req,res,next) {
    const message=JSON.parse(req.query.message)
    // 用request模块实现数据请求
    const url='https://api.douban.com/v2/movie/'+message.movieType+'?start='+message.start+'&count='+message.count
    console.log(url)
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })

})

// 请求电影详细数据
app.get('/getMovieDetailData',function (req,res,next) {
    const id=req.query.id
    const url='https://api.douban.com/v2/movie/subject/'+id
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })

})

const server=app.listen('3008',function () {
    console.log("服务已经启动，正在监听3008端口")
})
















