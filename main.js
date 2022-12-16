import App from './App'
import store from '@/store/store.js'

// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'

$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  wx.showLoading({
    title: '数据加载中...',
  })
  // console.log('m_user:', store.state.m_user);
  // 判断请求的地址是否包含'/my'，如果包含则获取token添加到请求头中
  if (options.url.indexOf('/my/') !== -1) {
    options.header = {
      Authorization: store.state.m_user.token
    }
  }
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
  wx.hideLoading()
}

// 封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title: title,
    duration: duration,
    icon: 'none'
  })
}

// 非Vue3部分
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$http = $http
Vue.prototype.$store = store


App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif


// Vue3部分
// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
uni.$http = $http
export function createApp() {
  const app = createSSRApp(App)
  // 这里是Vue3引入store的语法，和Vue2不同
  app.use(store)
  app.config.globalProperties.$http = $http
  return {
    app
  }
}
// #endif
