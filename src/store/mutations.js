import Vue from 'vue'
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
  // 更新words
  [RECEIVE_WORDS] (state, {words}) {
    state.words = words
  },
  // 更新定位地址信息
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  // 更新商品种类
  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories
  },
  // 更新商家列表
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  // 更新用户信息
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  },
  // 退出重置用户信息
  [RESET_USER] (state) {
    state.user = ''
  },
  //
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.foodCart.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.foodCart.splice(state.foodCart.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    state.foodCart.forEach((food) => {
      food.count = 0
      return ''
    })
    state.foodCart = []
  }
}
