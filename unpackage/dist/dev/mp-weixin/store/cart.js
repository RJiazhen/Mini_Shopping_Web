"use strict";
const common_vendor = require("../common/vendor.js");
const moduleCart = {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(common_vendor.index.getStorageSync("cart") || "[]")
  }),
  mutations: {
    saveToStorage(state) {
      common_vendor.index.setStorageSync("cart", JSON.stringify(state.cart));
    },
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (!findResult) {
        state.cart.push(goods);
      } else {
        findResult.goods_count++;
      }
      this.commit("m_cart/saveToStorage");
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter((x) => x.goods_id !== goods_id);
      this.commit("m_cart/saveToStorage");
    },
    updateAllGoodsState(state, newState) {
      state.cart.forEach((x) => x.goods_state = newState);
      this.commit("m_cart/saveToStorage");
    }
  },
  getters: {
    total(state) {
      return state.cart.reduce((total, item) => total += item.goods_count, 0);
    },
    checkedCount(state) {
      return state.cart.filter((x) => x.goods_state).reduce((total, item) => total += item.goods_count, 0);
    },
    checkedGoodsAmount(state) {
      return state.cart.filter((x) => x.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0).toFixed(2);
    }
  }
};
exports.moduleCart = moduleCart;
