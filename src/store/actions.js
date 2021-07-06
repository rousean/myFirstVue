import {
  reqAddress,
  reqCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqWords
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_WORDS
} from './mutation-types'

export default {
  // 异步获取单词
  async getWords ({commit}) {
    const result = await reqWords('select * from words limit 10')
    console.log(result)
    if (result.code === 0) {
      commit(RECEIVE_WORDS, {words: result.data})
    }
  },
  // 异步获取定位地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, {address: result.data})
    }
  },
  // 异步获取商品种类
  async getCategories ({commit}) {
    const result = await reqCategories()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORIES, {categories: result.data})
    }
  },
  // 异步获取商机列表
  async getShops ({commit, state}) {
    const result = await reqShops(state.longitude, state.latitude)
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, {shops: result.data})
    }
  },
  // 记录用户信息
  recordUser ({commit}, user) {
    commit(RECEIVE_USER, {user})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER, {user: result.data})
    }
  },
  // 退出登录
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  },
  // 获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      commit(RECEIVE_INFO, {info: result.data})
    }
  },
  // 获取商品信息
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      commit(RECEIVE_GOODS, {goods: result.data})
      // 数据更新了通知下一个组件
      callback && callback()
    }
  },
  // 获取评价信息
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, {ratings: result.data})
      // 数据更新了通知下一个组件
      callback && callback()
    }
  },
  // 更新购物车食物的数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
