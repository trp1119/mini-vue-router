import { createrMatcher } from "./create-matcher"
import HashHistory from "./history/hash"
import HTML5History from "./history/html5"
import install, { Vue } from "./install"

export default class VueRouter {
  constructor (options = {}) {
    this.mode = options.mode || 'hash'

    this.matcher = createrMatcher(options.routes || [])

    // 根据模式初始化不同的路由系统
    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;
      case 'history':
        this.history = new HTML5History(this)
        break;
    }

    this.beforeHooks = []
  }

  init (app) {
    const history = this.history
    // hash => hashChange
    // history => popState
    // popState 性能优于 hashChange，也可以监听 hash 路由变化。但有兼容性问题，如果浏览器支持 popState 优先使用 popState。

    // 页面初始化完毕后，先进性一次跳转
    // 跳转到某个路径并启动路由监听器
    const setUpListener = () => {
      history.setUpListener()
    }
    history.transitionTo(history.getCurrentLocation(), setUpListener)

    history.listen((route) => {
      // 监听如果 current 变化，就重新给 _route 赋值
      app._route = route
    })
  }

  match (location) {
    return this.matcher.match(location)
  }

  push (location) {
    this.history.transitionTo(location, () => {
      this.history.pushState(location)
    })
  }

  // 与 koa express 的 next 类似，核心思想是收集回调，然后依次执行
  beforeEach (fn) {
    this.beforeHooks.push(fn)
  }
}

VueRouter.install = install
