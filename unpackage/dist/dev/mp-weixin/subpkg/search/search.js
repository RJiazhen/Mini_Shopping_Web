"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      timer: null,
      keywrod: "",
      searchResult: [],
      searchHistory: []
    };
  },
  computed: {
    historys() {
      return [...this.searchHistory].reverse();
    }
  },
  onLoad() {
    this.searchHistory = JSON.parse(common_vendor.index.getStorageSync("searchHistory") || "[]");
  },
  methods: {
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.keywrod = e;
        this.getSearchResult();
      }, 500);
    },
    async getSearchResult() {
      if (this.keywrod.length === 0) {
        this.searchResult = [];
        return;
      }
      const {
        data: res
      } = await this.$http.get("/api/public/v1/goods/qsearch", {
        query: this.keywrod
      });
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.searchResult = res.message;
      this.saveSearchHistory();
    },
    gotoDetail(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
      });
    },
    saveSearchHistory() {
      const set = new Set(this.searchHistory);
      set.delete(this.keywrod);
      set.add(this.keywrod);
      this.searchHistory = Array.from(set);
      common_vendor.index.setStorageSync("searchHistory", JSON.stringify(this.searchHistory));
    },
    cleanSearchHistory() {
      this.searchHistory = [];
      common_vendor.index.setStorageSync("searchHistory", "[]");
    },
    gotoGoodsList(keyword) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + keyword
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_tag2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_tag)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.input),
    b: common_vendor.p({
      radius: 100,
      cancelButton: "none"
    }),
    c: $data.searchResult.length !== 0
  }, $data.searchResult.length !== 0 ? {
    d: common_vendor.f($data.searchResult, (item, i, i0) => {
      return {
        a: common_vendor.t(item.goods_name),
        b: "172e78ce-1-" + i0,
        c: i,
        d: common_vendor.o(($event) => $options.gotoDetail(item), i)
      };
    }),
    e: common_vendor.p({
      type: "arrowright",
      size: "16"
    })
  } : {
    f: common_vendor.o($options.cleanSearchHistory),
    g: common_vendor.p({
      type: "trash",
      size: "25"
    }),
    h: common_vendor.f($options.historys, (item, i, i0) => {
      return {
        a: i,
        b: common_vendor.o(($event) => $options.gotoGoodsList(item), i),
        c: "172e78ce-3-" + i0,
        d: common_vendor.p({
          text: item
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
