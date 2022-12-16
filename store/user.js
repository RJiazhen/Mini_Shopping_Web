export default {
  // 开启命名空间
  namespaced: true,
  // 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户信息对象
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 页面重定向信息
    redirectInfo: null
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address

      // 调用存储方法保存address到本地存储
      this.commit('m_user/saveAddressToStorage')
    },
    // 持续化存储address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },

    // 更新用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo

      this.commit('m_user/saveUserInfoToStorage')
    },
    // 存储用户信息
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新token
    updateToken(state, token) {
      state.token = token

      this.commit('m_user/saveTokenToStorage')
    },
    // 存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新重定向信息对象
    updataRedirectInfo(state, info) {
      state.redirectInfo = info
    }


  },
  getters: {
    // 使用计算属性拼接地址字符串
    addStr(state) {
      if (!state.address.provinceName) return ''
      const addStr = state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      return addStr
    }
  }
}
