export default {
  namespaced: true,
  // 用来存储购物车相关的状态
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的mutations方法
  mutations: {
    // 保存购物车数据到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },

    // 添加购物车
    addToCart(state, goods) {
      // 判断是否找到相同id的商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        // 如果没有则直接添加该商品
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // 调用函数保存数据到本地
      this.commit('m_cart/saveToStorage')
    },

    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },

    // 更新商品数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },

    // 根据Id删除商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },

    // 更新商品勾选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)

      this.commit('m_cart/saveToStorage')
    }
  },


  // 模块的getters属性
  getters: {
    // 商品总数
    total(state) {
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },

    // 已选商品总数
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },

    // 全部已选商品的价格
    checkedGoodsAmount(state) {
      return state.cart
        .filter(x => x.goods_state)
        .reduce((total, item) => total += item.goods_price * item.goods_count, 0)
        .toFixed(2)
    }

  },
}
