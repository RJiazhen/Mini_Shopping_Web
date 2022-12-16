"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-search",
  props: {
    bgcolor: {
      type: String,
      default: "#C00000"
    },
    radius: {
      type: Number,
      default: 18
    }
  },
  data() {
    return {};
  },
  methods: {
    searchBoxHandle() {
      this.$emit("myclick");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.radius + "px",
    b: $props.bgcolor,
    c: common_vendor.o((...args) => $options.searchBoxHandle && $options.searchBoxHandle(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
