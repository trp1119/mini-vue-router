import link from "./components/link"
import view from "./components/view"

export let Vue

export default function install (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        // 根组件
        this._router = this.$options.router // this.$options.router 为  router 实例 new VueRouter()
        this._routerRoute = this

        // 初始化路由
        this._router.init(this) // this 为应用实例 new Vue()

        // 在哪里使用就收集对应的 watcher
        Vue.util.defineReactive(this, '_route', this._router.history.current)

      } else {
        // 子组件
        this._routerRoute = this.$parent && this.$parent._routerRoute

        // 所有组件都可以通过 _routerRoute._router 获取到 router 实例
      }
    }
  })

  // 为 Vue 原型扩展属性，为 $router 与 $route 绑定多个方法
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoute._router
    },
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoute._route
    },
  })

  // 注册组件
  Vue.component('router-link', link)
  Vue.component('router-view', view)
}
