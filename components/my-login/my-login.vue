<template>
  <view>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <!-- 当需要点击按钮获取用户信息时，需要设置open-type和@getuserinfo事件，这两个是固定组合，详情参见文档 -->
      <!-- 根据后续查阅文档，目前（2022/8/29）微信已更新API，使用原方法只能获得匿名数据，如果要获得用户数据，则需要使用uni.getUserProfile -->
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <text class="tips-text">登录后尽享更多权益</text>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex"
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updataRedirectInfo']),

      // 用户授权后获取用户的基本信息
      getUserProfile() {
        var self = this
        uni.getUserProfile({
          desc: 'test',
          lang: "zh_CN",
          success(res) {
            self.updateUserInfo(res.userInfo);
            self.getToken(res)
          },

          fail(e) {
            if (e.errMsg === "getUserProfile:fail auth deny") return uni.$showMsg('您取消了登录授权')
            uni.$showMsg('授权失败')
          }
        })
      },

      // 获取code对应的值
      getToken(info) {
        uni.login({
          // 登录成功后使用返回的信息获取token
          success: async (res) => {
            console.log('login');
            console.log('this:', this);
            if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
            const query = {
              code: res.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            }
            const {
              data: loginResult
            } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            // 这里回传信息中提示"Error: invalid code, rid: 630da6a2-6a7ad3bb-52348cb6"，估计是API接受的参数要求变了，所以这里直接生造一个token字符串了，
            // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
            // uni.$showMsg('登录成功')
            var token = 'f283fdis'
            this.updateToken(token)
            // 返回登录前页面
            this.navigateBack()
          }
        })
      },
      // 导航回之前的页面
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          console.log('if');
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              console.log('this:', this);
              // 将redirectInfo重置为null
              console.log('redi');
              this.updataRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #F8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden; // 隐藏after元素的下半部分

    // 添加一个下方的白色区域形成弧型遮挡
    &::after {
      content: " ";
      display: block;
      background-color: white;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%; // 形成弧线
      transform: translateY(50%); // 将下半部分移出容器外
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
