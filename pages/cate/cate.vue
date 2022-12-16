<template>
  <my-search v-on:myclick="gotoSearch"></my-search>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧分类列表 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
        <template v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item', i===active?'active':'']" v-on:click="activeChange(i)">
            {{item.cat_name}}
          </view>
        </template>
        <view class="left-scroll-view-item active">left</view>
      </scroll-view>
      <!-- 右侧二级分类列表 -->
      <scroll-view class="right-cate-list" scroll-y="true" :style="{height: windowHeight + 'px'}"
        :scroll-top="scrollTop">
        <template v-for="(item2, i2) in catelevel2" :key="i2">
          <!-- 二级分类标题 -->
          <view class="cate-lv2">
            <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
            <!-- 三级分类列表 -->
            <view class="cate-lv3-list">
              <template v-for="(item3,i3) in item2.children" :key="i3">
                <view class="cate-lv3-item" v-on:click="gotoGoodsList(item3)">
                  <image src="/static/errorimage.png" mode="aspectFill"></image>
                  <text> {{item3.cat_name}}</text>
                </view>
              </template>
            </view>
          </view>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    data() {
      return {
        windowHeight: 0,
        cateList: [],
        active: 0,
        catelevel2: [],
        scrollTop: 0,
      };
    },

    onLoad() {
      // 获取当前屏幕高度，会根据设备不同进行动态调整，并且减去搜索栏的50px高度
      this.windowHeight = uni.getSystemInfoSync().windowHeight - 50
      // 获取分类数据
      this.getCateList()
    },

    methods: {

      // 获取分类数据
      async getCateList() {
        const {
          data: res
        } = await this.$http.get('/api/public/v1/categories')
        // 请求失败时
        if (res.meta.status !== 200) return uni.$showMsg("数据请求失败")

        // 数据请求成功时
        this.cateList = res.message

        // 设置默认的二级分类菜单数据
        this.catelevel2 = this.cateList[0].children
        console.log(this.cateList);
      },

      // 切换出于激活状态的左侧item
      activeChange(i) {
        this.active = i

        // 激活的标签改变时，修改二级菜单数据
        this.catelevel2 = this.cateList[i].children

        // 重置右侧滚动条的位置，因为如果前后赋值一样不会重置，所以需要使用判断
        this.scrollTop = this.scrollTop ? 0 : 1
      },

      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 跳转到搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },

      // 检测到图片获取错误就将图片替换为错误图片
      // imageError(e, i1, i2, i3) {
      //   console.log(
      //     `i1:${i1} ${this.cateList?[i1]['cat_name']}, i2:${i2} ${this.cateList?[i1]['children']?[i2]['cat_name']}, i3:${i3} ${this.cateList?[i1]['children'][i2]['children'][i3]['cat_name']}`
      // );
      // console.log('i1', i1, );
      // console.log('i2', i2, this.cateList[i1]['cat_name']);
      // console.log('i3', i3, this.cateList[i1]['cat_name']);

      // this.officeApp[i1]['app_list'][index]['icon'] = '/static/errorimage.png'
      // },
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #f7f7ff;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        // 选择同时带有active这个类名的元素，用来设置激活选项的样式
        &.active {
          background-color: #fff;
          position: relative;

          // 设置红色小竖条
          &::before {
            content: " ";
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2 {
      .cate-lv2-title {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        image {
          width: 60px;
          height: 60px;
          border: #c00000 1px solid;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
