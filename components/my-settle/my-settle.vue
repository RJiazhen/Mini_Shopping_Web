<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">¥{{checkedGoodsAmount}}</text>

    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">
      结算({{checkedCount}})
    </view>
  </view>

</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from "vuex"
  export default {
    name: "my-settle",
    data() {
      return {
        // 延迟导航时间
        seconds: 3,
        // 定时器
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      isFullCheck() {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updataRedirectInfo']),
      // 修改所有商品的选中状态
      changeAllState() {
        // 使用this.isFullCheck获取现在全选按钮状态，
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 结算按钮点击事件
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
        if (!this.addStr) return uni.$showMsg('请选择收货地址')
        // if (!this.token) return uni.$showMsg('请先登录')
        if (!this.token) return this.deleyNavigate()

        // 微信支付功能
        this.payOrder()
      },
      // 显示倒计时遮罩
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请先登录，将在' + n + '秒后跳转到登录页面',
          mask: true,
        })
      },
      // 延迟导航到my页面
      deleyNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)
        // 设置定时器，显示秒数减少的倒计时遮罩
        this.timer = setInterval(() => {
          this.seconds--
          // 当倒计时<=0时，停止计时器
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              // 当成功跳转后更新重定向对象的信息，用来登录后立即跳转回购物车页面
              success: () => {
                this.updataRedirectInfo({
                  // openType
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      // 微信支付
      async payOrder() {
        const orderInfo = {
          order_price: 0.01,
          consignee_addrr: this.addStr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        const {
          data: res
        } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)

        // if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
        // const orderNumber = res.message.orderNumber
        // 这里由于使用的token不是服务器生成的，所以也不会返回正常的res信息，所以订单编号也生造一个
        const orderNumber = 2384923173239

        // 订单的预支付
        const {
          data: res2
        } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
          order_number: orderNumber
        })
        console.log('res2', res2);
        // 预付订单失败
        // if (res.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
        // const payInfo = res2.message.pay

        // 由于使用的orderNumber不是后端生成的数据，所以返回值也自然是报错，所以payInfo也是自己生造
        const payInfo = {}

        // 3. 发起微信支付
        // 3.1 调用 uni.requestPayment() 发起微信支付
        // const [err, succ] = await uni.requestPayment(payInfo)
        // 3.2 未完成支付
        // if (err) return uni.$showMsg('订单未支付！')
        // 3.3 完成了支付，进一步查询支付的结果
        // const {
        //   data: res3
        // } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
        //   order_number: orderNumber
        // })
        // 3.4 检测到订单未支付
        // if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // // 3.5 检测到订单支付完成
        // uni.showToast({
        //   title: '支付完成！',
        //   icon: 'success'
        // })

      }
    }

  }
</script>

<style lang="scss">
  .my-settle-container {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
        font-weight: bold;
      }
    }

    .btn-settle {
      background-color: #c00000;
      height: 50px;
      color: white;
      line-height: 50px;
      min-width: 100px;
      text-align: center;
    }

  }
</style>
