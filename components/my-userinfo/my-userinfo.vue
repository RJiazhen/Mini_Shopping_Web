<template>
  <view class="my-userinfo-container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userInfo.avatarUrl" class="avater"></image>
      <view class="nickname">
        {{userInfo.nickName}}
      </view>
    </view>
    <!-- 面板区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image class="icon" src="../../static/my-icons/icon1.png"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="../../static/my-icons/icon2.png"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="../../static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="../../static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>

        </view>

      </view>
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
  } from "vuex"
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
      logout() {
        var self = this
        uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          success: function(res) {
            if (res.confirm) {
              // 把地址、个人信息、token都清空
              self.updateAddress({})
              self.updateUserInfo({})
              self.updateToken('')
            }
          }

        })
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
      height: 400rpx;
      background-color: #C00000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .avater {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #fff;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      margin-bottom: 8px;
      background-color: white;
      border-radius: 3px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            height: 35px;
            width: 35px;
          }
        }
      }
    }
  }

  .panel-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    line-height: 45px;
  }
</style>
