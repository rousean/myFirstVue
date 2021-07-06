<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">{{!user._id ? "登录/注册" : "个人中心"}}</span>
      </span>
    </HeaderTop>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categories.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categoriesArr, index) in categoriesArrs" :key="index">
                <router-link :to="{path: 'categoryfood', query:{title: categories.title}}" v-for="(categories, index) in categoriesArr" :key="index" class="link_to_food">
                  <div class="food_container">
                    <img :src="baseUrl + categories.image_url" alt="食物">
                  </div>
                  <span>{{categories.title}}</span>
                </router-link>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="msite_back" v-else>
        </nav>
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList></ShopList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      baseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getWords')
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getShops')
  },
  computed: {
    ...mapState(['address', 'categories', 'user', 'words']),
    categoriesArrs () {
      const {categories} = this
      let categoriesArrays = []
      let categoriesArr = []
      categories.forEach(c => {
        if (categoriesArr.length === 0) {
          categoriesArrays.push(categoriesArr)
        }
        categoriesArr.push(c)
        if (categoriesArr.length === 8) {
          categoriesArr = []
        }
      })
      return categoriesArrays
    }
  },
  watch: {
    categories (value) {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
        new BScroll('.miste-content-wrapper', {
          click: true
        })
      })
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
          padding 10px 10px 0
          .shop_icon
            margin-left 5px
            color #999
          .shop_header_title
            color #999
            font-size 14px
            line-height 20px
</style>
