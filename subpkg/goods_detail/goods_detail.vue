<template>
  <view>
    <watermark></watermark>
    <!-- 只有在接收了数据，有good_name之后再渲染页面 -->
    <view v-if="goods_info.goods_name">
      <!-- 轮播图 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
        <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
          <!-- 给图片绑定一个点击事件，触发图片预览窗口 -->
          <image :src="item.pics_big" @click="preview(i)"></image>
        </swiper-item>
      </swiper>
      <!-- 商品信息区域 -->
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="price">
          ¥{{goods_info.goods_price}}
        </view>
        <!-- 商品信息主体区域 -->
        <view class="goods-info-body">
          <!-- 商品名称 -->
          <view class="goods_name">
            {{goods_info.goods_name}}
          </view>
          <!-- 收藏 -->
          <view class="favi">
            <uni-icons type="star" size="18" color="gray"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <!-- 运费 -->
        <view class="freight">
          快递：免运费
        </view>
      </view>
    </view>
    <!-- 底部 添加购物车 导航栏 -->
    <view class="goods-nav">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
    <!-- 商品详情 -->
    <rich-text class="goods-detail-container" :nodes="goods_info.goods_introduce"></rich-text>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex"

  export default {
    computed: {
      // 引入m_cart保存的属性
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      // 原方法，total在第一次打开App时不会被调用
      //   total(newVal) {
      //     console.log(newVal);
      //     // 遍历寻找“购物车”选项
      //     const findResult = this.options.find(x => x.text === '购物车')
      //     if (findResult) {
      //       // 修改购物车的info
      //       findResult.info = newVal
      //     }
      //   }

      // 把total设置为一个对象，并且添加immediate参数，从而保证其第一次打开App时就能被调用
      total: {
        handler(newVal) {
          // 遍历寻找“购物车”选项
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            // 修改购物车的info
            findResult.info = newVal
          }
        },
        // 设置immediate为true，让其第一次打开App时就被调用
        immediate: true,
      }
    },
    data() {
      return {
        goods_info: {},
        options: [{
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },

    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },

    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg('')

        // 提前修改商品详情中的img标签样式，以及把webp格式的请求修改为jpg格式的，以防止iOS设备上支持不好
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, 'jpg')

        this.goods_info = res.message
      },
      // 图片预览方法
      preview(i) {
        // 使用uni内置的图片预览方法，
        uni.previewImage({
          // 默认显示图片的索引
          current: i,
          // 所有图片url地址的数组
          urls: this.goods_info.pics.map(pic => pic.pics_big),
          complete: (() => {
            console.log('complete');
          })
        })
      },

      // 左侧按钮点击事件
      onClick(e) {
        // 跳转到购物车界面
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },

      // 右侧按钮点击事件
      buttonClick(e) {
        if (e.content.text === "加入购物车") {
          const goods = {
            goods_id: this.goods_info.goods_id,
            goods_name: this.goods_info.goods_name,
            goods_price: this.goods_info.goods_price,
            goods_count: 1,
            goods_small_logo: this.goods_info.goods_small_logo,
            goods_state: true,
          }
          this.addToCart(goods)
        }
      }
    },

  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .freight {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .goods-detail-container {
    padding-bottom: 50px;
  }
</style>
