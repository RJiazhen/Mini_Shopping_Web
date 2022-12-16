"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-settle",
  data() {
    return {
      seconds: 3,
      timer: null
    };
  },
  computed: {
    ...common_vendor.mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    ...common_vendor.mapGetters("m_user", ["addStr"]),
    ...common_vendor.mapState("m_user", ["token"]),
    ...common_vendor.mapState("m_cart", ["cart"]),
    isFullCheck() {
      return this.checkedCount === this.total;
    }
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["updateAllGoodsState"]),
    ...common_vendor.mapMutations("m_user", ["updataRedirectInfo"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck);
    },
    settlement() {
      if (!this.checkedCount)
        return common_vendor.index.$showMsg("\u8BF7\u9009\u62E9\u8981\u7ED3\u7B97\u7684\u5546\u54C1");
      if (!this.addStr)
        return common_vendor.index.$showMsg("\u8BF7\u9009\u62E9\u6536\u8D27\u5730\u5740");
      if (!this.token)
        return this.deleyNavigate();
      this.payOrder();
    },
    showTips(n) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u8BF7\u5148\u767B\u5F55\uFF0C\u5C06\u5728" + n + "\u79D2\u540E\u8DF3\u8F6C\u5230\u767B\u5F55\u9875\u9762",
        mask: true
      });
    },
    deleyNavigate() {
      this.seconds = 3;
      this.showTips(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          common_vendor.index.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updataRedirectInfo({
                openType: "switchTab",
                from: "/pages/cart/cart"
              });
            }
          });
          return;
        }
        this.showTips(this.seconds);
      }, 1e3);
    },
    async payOrder() {
      const orderInfo = {
        order_price: 0.01,
        consignee_addrr: this.addStr,
        goods: this.cart.filter((x) => x.goods_state).map((x) => ({
          goods_id: x.goods_id,
          goods_number: x.goods_count,
          goods_price: x.goods_price
        }))
      };
      await common_vendor.index.$http.post("/api/public/v1/my/orders/create", orderInfo);
      const orderNumber = 2384923173239;
      const {
        data: res2
      } = await common_vendor.index.$http.post("/api/public/v1/my/orders/req_unifiedorder", {
        order_number: orderNumber
      });
      console.log("res2", res2);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.isFullCheck,
    b: common_vendor.o((...args) => $options.changeAllState && $options.changeAllState(...args)),
    c: common_vendor.t(_ctx.checkedGoodsAmount),
    d: common_vendor.t(_ctx.checkedCount),
    e: common_vendor.o((...args) => $options.settlement && $options.settlement(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2-Learn/My_Project/Mini_Shopping_Web/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
