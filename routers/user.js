/**
 * 用户 路由 模块
 * 由上到下代码编写过程
 *      引入依赖-> 声明变量-> 声明函数 -> 声明类型 -> 导出数据
 */
const express = require('express')
const fs = require('fs')
const path = require('path')
const svgCaptcha = require('svg-captcha')

const router = express.Router()

let userArray = ""

router.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
        size: 6,
        ignoreChars: '0oO1lIi',
        noise: 4,
        color: true
    });

    req.session.captcha = captcha.text

    res.type('svg')
    res.status(200).send(captcha.data)


})

router.get('/register', (req, res) =>{
    // 返回register.ejs注册页面, 并返回提示消息
    res.render('register', {code: 200, msg: ''})
})

router.post('/register', (req, res) => {
    let {username,
        password,
        nickname,
        headerImg='/public/uploads/default.jpg'} = req.body
    for (let user of userArray) {
        if (user.username === username) {
            res.render('register', {code: 501, msg: '用户已被占用'})
            return
        }
    }
    let user = {username, password, nickname, headerImg}
    userArray.push(user)
    saveData()
    res.render('register', {code: 200, msg: '用户注册成功'})
})

function initData() {
    fs.readFile(path.join(__dirname, '../users.json'), 'utf-8', (err, data) =>{
        if (err) {
            console.log(__dirname)
            fs.writeFile(path.join(__dirname, '../users.json'), "[]", () => {
                console.log("文件创建完成")
            })
        } else {
            userArray = JSON.parse(data)
        }
    })
}

function saveData() {
    fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(userArray), (err => {
        console.log("系统数据存储完成")
    }))
}

initData()

module.exports = router
