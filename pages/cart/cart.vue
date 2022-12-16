<template>
  <view class="">
    <watermark></watermark>
    <view class="cart-container" v-if="cart.length !== 0">
      <!-- 地址区域 -->
      <my-address></my-address>
      <!-- 购物车区域 -->
      <view>
        <!-- 商品列表的标题区域 -->
        <view class="cart-title">
          <!-- 左侧图标 -->
          <uni-icons type="shop" size="18"></uni-icons>
          <!-- 右侧的文本 -->
          <text class="cart-title-text">购物车</text>

        </view>
        <!-- 循环渲染购物车中商品信息 -->
        <uni-swipe-action>
          <template v-for="(goods, i) in cart" :key="i">
            <uni-swipe-action-item :right-options="options" @click="swipeItemClick(goods)">
              <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true"
                @num-change="numberChangeHandler">
              </my-goods>
            </uni-swipe-action-item>
          </template>
        </uni-swipe-action>
      </view>
      <!-- 结算菜单区域 -->
      <my-settle></my-settle>
    </view>
    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
  </view>
</template>

<script>
  // 引入徽标显示mixin
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations,
  } from 'vuex'

  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart']),
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 更新商品勾选状态
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      // 更新商品数量
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 滑动删除选项点击
      swipeItemClick(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;

    .cart-title {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 5px;
      border-bottom: 1px solid #efefef;

      .cart-title-text {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      height: 90px;
      width: 90px;
    }

    .tip-text {
      font-size: 12px;
      columns: gray;
      margin-top: 15px;

    }
  }
</style>
