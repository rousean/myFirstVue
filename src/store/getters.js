export default {
  totalCartCount (state) {
    return state.foodCart.reduce((preCount, food) => preCount + food.count, 0)
  },
  totalCartSum (state) {
    return state.foodCart.reduce((preSum, food) => preSum + food.count * food.price, 0)
  },
  satisfiedRatings (state) {
    return state.ratings.reduce((preSum, rating) => preSum + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
