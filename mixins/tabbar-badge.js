import {
  mapGetters
} from "vuex"

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    // 页面显示时设置购物车图标的徽标
    this.setBadge()
  },

  methods: {
    setBadge() {
      // 使用setTabBarBadge方法设置徽标
      uni.setTabBarBadge({
        index: 2,
        // 注意这里徽标内容必须是字符串
        text: this.total + ''
      })
    }
  },
}
