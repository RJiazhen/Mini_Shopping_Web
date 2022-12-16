"use strict";
const common_vendor = require("../common/vendor.js");
const badgeMix = {
  computed: {
    ...common_vendor.mapGetters("m_cart", ["total"])
  },
  watch: {
    total() {
      this.setBadge();
    }
  },
  onShow() {
    this.setBadge();
  },
  methods: {
    setBadge() {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: this.total + ""
      });
    }
  }
};
exports.badgeMix = badgeMix;
