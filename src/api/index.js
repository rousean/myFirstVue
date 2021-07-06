/*
* 接口函数
* */
import ajax from './ajax'
const BASEURL = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASEURL}/position/${geohash}`)

// 获取食品分类列表
export const reqCategories = () => ajax(BASEURL + '/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASEURL + '/shops', {longitude, latitude})

// 根据经纬度和关键字搜索商铺列表
// 获取一次性验证码
export const reqCaptcha = () => ajax(BASEURL + '/captcha?time=' + Date.now())

// 用户名密码登陆
export const reqPwdLogin = (name, pwd, captcha) => ajax(BASEURL + '/login_pwd', {name, pwd, captcha}, 'POST')

// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASEURL + '/sendcode', {phone})

// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASEURL + '/login_sms', {phone, code}, 'POST')

// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASEURL + '/userinfo')

// 用户登出
export const reqLogout = () => ajax(BASEURL + '/logout')

// 获取商家信息
export const reqShopInfo = () => ajax('/info')

// 获取评价信息
export const reqShopRatings = () => ajax('/ratings')

// 获取商品信息
export const reqShopGoods = () => ajax('/goods')

// 获取单词
export const reqWords = (sql) => ajax(BASEURL + '/word', {sql})
