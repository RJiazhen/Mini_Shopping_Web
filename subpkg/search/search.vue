<template>
  <view>
    <watermark></watermark>
    <view class="search-bar">
      <!-- 注意如果需要修改搜索框的背景颜色需要去修改 uni-search-bar.vue 源代码文件 -->
      <!-- 如果需要自动获取焦点，则需要修改源文件中show和showSync的值为true -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表-->
    <!-- 根据searchResult的长度判断是否渲染该区域以及搜索历史区域 -->
    <view class="sugg-list" v-if="searchResult.length!==0">
      <view class="sugg-item" v-for="(item, i) in searchResult" :key="i" v-on:click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <!-- 这里的v-else搭配搜索建议列表的v-if，用来动态确定是否渲染该区域 -->
    <view class="search-history" v-else>
      <view class="search-history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="25" v-on:click="cleanSearchHistory"></uni-icons>
      </view>
      <view class="search-history-list">

        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" v-on:click="gotoGoodsList(item)">
        </uni-tag>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器变量
        timer: null,
        keywrod: "",
        // 搜索结果列表
        searchResult: [],
        searchHistory: [],
      };
    },

    computed: {
      // 这里之所以专门设置一个计算属性用来生成元素，是为了防止修改searchHistory中元素的顺序
      // 还是尽量按照添加的时间顺序从前往后添加内容的好
      historys() {
        return [...this.searchHistory].reverse()
      }
    },
    onLoad() {
      // 页面加载时获取存储在本地的搜索历史
      this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
    },
    methods: {
      // 输入时获取输入内容
      input(e) {
        // 设置一个延时器，防抖
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keywrod = e
          this.getSearchResult()
        }, 500)
      },

      // 根据输入内容获取建议商品列表
      async getSearchResult() {
        // 如果输入内容为空，则直接设置为空然后返回
        if (this.keywrod.length === 0) {
          this.searchResult = []
          return
        }
        // 不为空则发起请求
        const {
          data: res
        } = await this.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keywrod
        })
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg()

        // 数据请求成功时
        this.searchResult = res.message

        // 获取到搜索建议列表数据后，将这些数据添加到searchHistory列表中
        this.saveSearchHistory()
      },

      // 点击搜索建议跳转到商品页面
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },

      // 保存搜索结果到搜索历史列表中
      saveSearchHistory() {
        // 利用Set对象中所有值均唯一的特性，从而防止搜索历史重复的问题
        const set = new Set(this.searchHistory)
        set.delete(this.keywrod)
        set.add(this.keywrod)

        // 将set再转换为数组，然后再重新赋值给searchHistory
        this.searchHistory = Array.from(set)

        // 把搜索历史数据持久保存在本地
        uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory))
      },

      // 点击垃圾桶图标清空历史
      cleanSearchHistory() {
        this.searchHistory = []
        uni.setStorageSync('searchHistory', '[]')
      },

      // 点击搜索历史跳转到商品列表页面
      gotoGoodsList(keyword) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + keyword
        })
      }

    },


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

  // 搜索历史
  .search-history {
    .search-history-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      font-size: 13px;
      padding: 0 7px;
      border-bottom: 1px solid #efefef;
    }

    .search-history-list {
      display: flex;
      flex-wrap: wrap;
      padding: 5px 5px 0 5px;

      // uni-tag组件会自动给自己添加这个类名
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
        background-color: #efefef;
        color: #000;
        border: none;

      }
    }
  }

  // 搜索建议列表
  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      // 均匀排布元素
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        // 不换行
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本内容溢出用...代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>
