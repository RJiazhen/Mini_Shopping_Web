"use strict";
const common_vendor = require("../../common/vendor.js");
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
const _sfc_main = {
  mixins: [mixins_tabbarBadge.badgeMix],
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  methods: {
    async getSwiperList() {
      const {
        data: res
      } = await this.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      common_vendor.index.$showMsg("\u6570\u636E\u8BF7\u6C42\u6210\u529F");
      this.swiperList = res.message;
    },
    async getNavList() {
      const {
        data: res
      } = await this.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      common_vendor.index.$showMsg("\u6570\u636E\u8BF7\u6C42\u6210\u529F");
      this.navList = res.message;
    },
    navClickHandler(item) {
      if (item.name === "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    },
    async getFloorList() {
      const {
        data: res
      } = await this.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = prod.navigator_url.replace(
            "/pages/goods_list",
            "/subpkg/goods_list/goods_list"
          );
        });
      });
      this.floorList = res.message;
    },
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.swiperList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
        c: i
      };
    }),
    c: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: i,
        c: common_vendor.o(($event) => $options.navClickHandler(item), i)
      };
    }),
    d: common_vendor.f($data.floorList, (item, i, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (item2, i2, i1) => {
          return common_vendor.e({
            a: i2 !== 0
          }, i2 !== 0 ? {
            b: item2.image_src,
            c: item2.image_width + "rpx",
            d: item2.url
          } : {}, {
            e: i2
          });
        }),
        f: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
