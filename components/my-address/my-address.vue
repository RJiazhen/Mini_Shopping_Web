<template>
  <view>
    <!-- 选择收货地址按钮 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
    </view>
    <!-- 收货地址 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addStr}}
        </view>

      </view>

    </view>
    <!-- 底部边框线 -->
    <img class="address-bord" src="/static/cart_border@2x.png">
  </view>
</template>

<script>
  // 导入vuex模块
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex"
  export default {
    name: "my-address",
    data() {
      return {
        // address: {}
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      // 选择收货地址功能
      chooseAddress() {
        var self = this
        uni.chooseAddress({
          success(res) {
            console.log(res.errMsg);
            if (res.errMsg === "chooseAddress:ok") {
              self.updateAddress(res)
            }
          },
          fail() {
            console.log('获取地址失败');
          }
        });
      },

    }
  }
</script>

<style lang="scss">
  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        justify-content: space-between;
      }

      .row1-left {
        .username {}
      }
    }

    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-bord {
    display: block;
    height: 5px;
    width: 100%;
  }
</style>
