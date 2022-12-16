"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("m_user", ["redirectInfo"])
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateUserInfo", "updateToken", "updataRedirectInfo"]),
    getUserProfile() {
      var self = this;
      common_vendor.index.getUserProfile({
        desc: "test",
        lang: "zh_CN",
        success(res) {
          self.updateUserInfo(res.userInfo);
          self.getToken(res);
        },
        fail(e) {
          if (e.errMsg === "getUserProfile:fail auth deny")
            return common_vendor.index.$showMsg("\u60A8\u53D6\u6D88\u4E86\u767B\u5F55\u6388\u6743");
          common_vendor.index.$showMsg("\u6388\u6743\u5931\u8D25");
        }
      });
    },
    getToken(info) {
      common_vendor.index.login({
        success: async (res) => {
          console.log("login");
          console.log("this:", this);
          if (res.errMsg !== "login:ok")
            return common_vendor.index.$showMsg("\u767B\u5F55\u5931\u8D25");
          const query = {
            code: res.code,
            encryptedData: info.encryptedData,
            iv: info.iv,
            rawData: info.rawData,
            signature: info.signature
          };
          await common_vendor.index.$http.post("/api/public/v1/users/wxlogin", query);
          var token = "f283fdis";
          this.updateToken(token);
          this.navigateBack();
        }
      });
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        console.log("if");
        common_vendor.index.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            console.log("this:", this);
            console.log("redi");
            this.updataRedirectInfo(null);
          }
        });
      }
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
    a: common_vendor.p({
      type: "contact-filled",
      size: "100",
      color: "#AFAFAF"
    }),
    b: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
