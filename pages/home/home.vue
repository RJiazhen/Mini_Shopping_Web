<template>
  <view>
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <my-search class="" v-on:myclick="gotoSearch"></my-search>
    </view>
    <!-- 轮播图-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item ,i ) in swiperList" :key="i">
        <!-- 把商品id作为参数传递 -->
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" v-on:click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧图片盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}"
              mode="widthFix">
            </image>
          </navigator>
          <!-- 右侧图片盒子 -->
          <view class="right-img-box">
            <!-- 遍历第二层数据，并且使用v-if过滤第一张图片 -->
            <template v-for="(item2,i2) in item.product_list" :key="i2">
              <!-- 注意v-if的优先级比v-for高，所以两者在同一标签中时，v-if无法读取v-for定义的变量，所以v-for单独使用template标签 -->
              <navigator class="right-img-item" v-if="i2!==0" :url="item2.url">
                <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
              </navigator>
            </template>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      // 调用方法，获取轮播图、导航栏、楼层数据
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {

      // 获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await this.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg()

        // 数据请求成功时
        uni.$showMsg("数据请求成功")
        this.swiperList = res.message
      },

      // 获取导航栏数据
      async getNavList() {
        const {
          data: res
        } = await this.$http.get('/api/public/v1/home/catitems')
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg()

        // 数据请求成功时
        uni.$showMsg("数据请求成功")
        this.navList = res.message
      },

      // 导航栏图标点击事件
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },

      // 获取首页楼层数据
      async getFloorList() {
        const {
          data: res
        } = await this.$http.get('/api/public/v1/home/floordata')
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg()

        // 数据请求成功时，对数据进行处理
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            // 将原产品携带的url修改为分包中页面的地址
            prod.url = prod.navigator_url.replace("/pages/goods_list",
              "/subpkg/goods_list/goods_list")
          })
        })
        this.floorList = res.message
      },

      // 跳转到搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  // 搜索栏
  .search-bar {
    position: sticky;
    top: 0;
    // 设置z轴位置，防止被遮挡
    z-index: 999;
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-list {
    .floor-item {
      .floor-title {
        width: 100%;
        height: 60rpx;
      }
    }
  }

  // 每个楼层图片
  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
