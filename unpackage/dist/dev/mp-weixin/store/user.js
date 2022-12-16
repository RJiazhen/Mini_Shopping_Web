"use strict";
const common_vendor = require("../common/vendor.js");
const moduleUser = {
  namespaced: true,
  state: () => ({
    address: JSON.parse(common_vendor.index.getStorageSync("address") || "{}"),
    token: common_vendor.index.getStorageSync("token") || "",
    userInfo: JSON.parse(common_vendor.index.getStorageSync("userInfo") || "{}"),
    redirectInfo: null
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    saveAddressToStorage(state) {
      common_vendor.index.setStorageSync("address", JSON.stringify(state.address));
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit("m_user/saveUserInfoToStorage");
    },
    saveUserInfoToStorage(state) {
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(state.userInfo));
    },
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    saveTokenToStorage(state) {
      common_vendor.index.setStorageSync("token", state.token);
    },
    updataRedirectInfo(state, info) {
      state.redirectInfo = info;
    }
  },
  getters: {
    addStr(state) {
      if (!state.address.provinceName)
        return "";
      const addStr = state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
      return addStr;
    }
  }
};
exports.moduleUser = moduleUser;
