<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">小程序</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isOn}" @click="changeOn">短信登录</a>
          <a href="javascript:;" :class="{on: !isOn}" @click="changeOn">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: isOn}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{change_color: rightPhone}" @click.prevent="getCode">
                {{countDown > 0 ? `已发送${countDown}s` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isOn}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="isShow">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="isShow ? 'on' : 'off'"  @click="changeShow">
                  <div class="switch_circle" :class="{right: isShow}"></div>
                  <span class="switch_text">{{isShow ? '显示' : '隐藏'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span @click="$router.back()" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
export default {
  data () {
    return {
      isOn: true, // 默认短信登录
      phone: '', // 用户输入手机号
      countDown: 0, // 发送验证码倒计时
      code: '', // 验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 验证码
      isShow: false, // 是否显示明文密码
      alertText: '', // 告警内容
      alertShow: false // 告警弹窗是否显示
    }
  },
  methods: {
    // 通过鼠标点击改变登录方式
    changeOn () {
      this.isOn = !this.isOn
    },
    // 切换密码显示方式
    changeShow () {
      this.isShow = !this.isShow
    },
    // 获取验证码
    async getCode () {
      if (!this.countDown) {
        this.countDown = 30
        this.intervalId = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }
      const result = await reqSendCode(this.phone)
      // 短信发送成功
      if (result.code === 0) {
        this.showAlert(result.msg)
        if (this.countDown) {
          this.countDown = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      }
      // 短信发送失败
      if (result.code === 1) {
        this.showAlert(result.msg)
      }
    },
    // 登录
    async login () {
      let result
      if (this.isOn) {
        const {phone, code} = this
        if (!this.rightPhone) {
          this.showAlert('手机号不正确')
          return
        } else if (!this.rightCode) {
          this.showAlert('验证码必须是6位')
          return
        }
        result = await reqSmsLogin(phone, code)
      } else {
        const {name, pwd, captcha} = this
        if (!this.name) {
          this.showAlert('用户名必须指定')
          return
        } else if (!this.pwd) {
          this.showAlert('密码必须指定')
          return
        } else if (!this.captcha) {
          this.showAlert('验证码必须指定')
          return
        }
        result = await reqPwdLogin(name, pwd, captcha)
      }
      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/profile')
      } else {
        this.getCaptcha()
        this.showAlert(result.msg)
      }
    },
    // 获取验证码图片
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 显示警告框内容
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 关闭警告框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    }
  },
  computed: {
    // 判断手机号是否正确
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    },
    // 验证码是否是6位数
    rightCode () {
      return /^\d{6}$/.test(this.code)
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.change_color
                  color black

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999

</style>
