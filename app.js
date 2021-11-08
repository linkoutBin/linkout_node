/**
 * 程序运行入口
 */
// 引入依赖
const express = require("express")
const path = require("path")
const cookieSession = require("cookie-session")

const user = require("./routers/user")
const favicon = require('serve-favicon')


// 创建服务器
const app = express();
// 网站小图标
app.use( favicon(path.join(__dirname, 'public', 'favicon.ico')) )
// 添加ejs模版引擎
app.set('view engine', 'ejs')
// post参数接收中间件
app.use( express.urlencoded({extended: false}))
app.use(cookieSession({
    name: 'session',
    keys: ['#2u2&39（（3', '@#!98krj&911jk']
}))

// 用户模块加载
app.use('/user', user)

//监听测试路径
app.get('/', (req, res) => {
    req.session.key = 'sessionkey'
    res.render('index', {message: '欢迎访问linkout'})
})

app.post('/verify', (req, res) =>{
    res.render('index', {message: req.session.key})
})

app.get("/data/str", (req, res) => {
    res.send("<h3>hello express!欢迎您！</h3>")
})

app.get("/data/obj", (req, res) => {
    let obj = {name: "bin", age: 100}
    res.send(obj)
})

app.get("/data/html", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"))
})

app.get('/data/ejs', (req, res) => {
    res.render('index', {user: 'hahhaa'})
})

// 启动服务器
app.listen(3000, () => console.log("服务器已启动...."))
