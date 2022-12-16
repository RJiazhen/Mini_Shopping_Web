<template>
  <view class="goods-item">
    <!-- 左侧盒子 -->
    <view class="goods-item-left">
      <!-- 左侧的勾选按钮 -->
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧盒子 -->
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-item-info">

        <view class="goods-price">
          ￥{{tofixed(goods.goods_price)}}
        </view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      // 设置一个goods属性用来接收数据
      goods: {
        type: Object,
        default: {},
      },
      // 用于控制勾选选项是否显示
      showRadio: {
        type: Boolean,
        default: false,
      },
      showNum: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        // 默认图片链接，没有图片时显示该图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      tofixed: function(num) {
        return Number(num).toFixed(2)
      },
      // radio组件点击事件处理函数
      radioClickHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 数字组件change事件触发函数
      numChangeHandler(val) {
        // 调用外部传入的num-change函数
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          // 写成+val这种形式是为了保证val是个数值
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;


      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-item-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }

    }
  }
</style>
