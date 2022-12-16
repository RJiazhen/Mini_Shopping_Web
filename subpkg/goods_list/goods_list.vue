<template>
  <view>
    <watermark></watermark>
    <view class="goods-list">
      <!--  -->
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoGoodsDetail(goods)">
        <!-- 调用自己封装的goods组件渲染内容 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10,
        },
        // 存储商品信息的列表
        goodsList: [],

        // 当前商品数量，用来判断是否还有下页数据
        total: 0,

        // 用来帮忙设置节流阀的数据
        isloading: false

      }
    },

    // 通过option可以获取页面参数
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },

    methods: {
      // 获取商品数据
      async getGoodsList(callback) {
        // 打开节流阀
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg()

        // 数据请求成功时进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total


        // 关闭节流阀
        this.isloading = false
        // 数据请求结束时运行回调函数
        callback && callback()
      },

      // 跳转到商品详情页面
      gotoGoodsDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      },
    },

    // 触底时触发的函数
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      // 如果正在发起请求，则直接停止触发新的请求
      if (this.isloading) return


      // 重新获取更多的数据
      this.queryObj.pagenum++
      this.getGoodsList()
    },

    // 下拉刷新时触发的函数
    onPullDownRefresh() {
      // 重置一些关键参数
      this.queryObj.pagenum = 1,
        this.total = 0,
        this.isloading = false,
        this.goodsList = []

      // 重新请求数据，并且需要传入一个结束下拉刷新的方法，用来请求结束时调用
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
