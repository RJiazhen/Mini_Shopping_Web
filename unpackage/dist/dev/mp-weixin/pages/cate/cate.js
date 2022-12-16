"use strict";
const common_vendor = require("../../common/vendor.js");
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
const _sfc_main = {
  mixins: [mixins_tabbarBadge.badgeMix],
  data() {
    return {
      windowHeight: 0,
      cateList: [],
      active: 0,
      catelevel2: [],
      scrollTop: 0
    };
  },
  onLoad() {
    this.windowHeight = common_vendor.index.getSystemInfoSync().windowHeight - 50;
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const {
        data: res
      } = await this.$http.get("/api/public/v1/categories");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg("\u6570\u636E\u8BF7\u6C42\u5931\u8D25");
      this.cateList = res.message;
      this.catelevel2 = this.cateList[0].children;
      console.log(this.cateList);
    },
    activeChange(i) {
      this.active = i;
      this.catelevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop ? 0 : 1;
    },
    gotoGoodsList(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
      });
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
    b: common_vendor.f($data.cateList, (item, i, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.n(i === $data.active ? "active" : ""),
        c: common_vendor.o(($event) => $options.activeChange(i), i),
        d: i
      };
    }),
    c: $data.windowHeight + "px",
    d: common_vendor.f($data.catelevel2, (item2, i2, i0) => {
      return {
        a: common_vendor.t(item2.cat_name),
        b: common_vendor.f(item2.children, (item3, i3, i1) => {
          return {
            a: common_vendor.t(item3.cat_name),
            b: common_vendor.o(($event) => $options.gotoGoodsList(item3), i3),
            c: i3
          };
        }),
        c: i2
      };
    }),
    e: $data.windowHeight + "px",
    f: $data.scrollTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
