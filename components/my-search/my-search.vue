<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}" v-on:click="searchBoxHandle">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <icon type="search" size="15" />
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      // 通过设置变量来存储style的值，可以用来动态设置其样式
      // 背景颜色变量
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸变量
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandle() {
        // 这里需要使用$emit主动触发点击事件，否则外部引用时设置的click事件默认不触发
        // 也可以把click改成自定义事件
        // this.$emit('click')
        this.$emit('myclick')
      },
    }

  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;

    display: flex;
    align-items: center;
    padding: 0 10px;

    .my-search-box {
      height: 36px;
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
