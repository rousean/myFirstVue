/*
* 接口函数
* */

import ajax from './ajax.js'
const preUrl = 'http://localhost:4000'

// 根据经纬度获取位置详情
const reqAddress = (geohash) => {
  ajax(preUrl + '/position', geohash, 'GET')
}

// 获取食品分类列表
// 根据经纬度获取商铺列表
// 根据经纬度和关键字搜索商铺列表
// 获取一次性验证码
// 用户名密码登陆
// 发送短信验证码
// 手机号验证码登陆
// 根据会话获取用户信息
// 用户登出
