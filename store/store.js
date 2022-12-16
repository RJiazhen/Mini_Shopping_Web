// 引入vuex，用来创建store对象
import {
  createStore
} from 'vuex'
// 引入购物车模块
import moduleCart from '@/store/cart.js'
// 引入地址模块
import moduleUser from "@/store/user.js"

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    // 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    m_cart: moduleCart,
    m_user: moduleUser
  }
})

export default store
