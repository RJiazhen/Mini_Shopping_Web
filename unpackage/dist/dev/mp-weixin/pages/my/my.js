"use strict";
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mixins: [mixins_tabbarBadge.badgeMix],
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("m_user", ["token"])
  }
};
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  const _easycom_my_userinfo2 = common_vendor.resolveComponent("my-userinfo");
  (_easycom_my_login2 + _easycom_my_userinfo2)();
}
const _easycom_my_login = () => "../../components/my-login/my-login.js";
const _easycom_my_userinfo = () => "../../components/my-userinfo/my-userinfo.js";
if (!Math) {
  (_easycom_my_login + _easycom_my_userinfo)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.token
  }, !_ctx.token ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);