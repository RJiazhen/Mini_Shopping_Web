"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-userinfo",
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("m_user", ["userInfo"])
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateAddress", "updateUserInfo", "updateToken"]),
    logout() {
      var self = this;
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u8BA4\u9000\u51FA\u767B\u5F55\u5417\uFF1F",
        success(res) {
          self.updateAddress({});
          self.updateUserInfo({});
          self.updateToken("");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.userInfo.avatarUrl,
    b: common_vendor.t(_ctx.userInfo.nickName),
    c: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    d: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    e: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    f: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
