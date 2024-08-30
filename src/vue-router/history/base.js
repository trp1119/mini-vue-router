function createRoute (record, location) {
  const matched = []

  while (record) {
    matched.unshift(record)
    record = record.parent
  }

  return {
    ...location,
    matched
  }
}

function runQuene (quene, iterator, cb) {
  function step (index) {
    if (index >= quene.length) return cb()
    const hook = quene[index]
    iterator(hook, () => step(index + 1))
  }
  step(0)
}

// 路由公共方法
export default class History {
  constructor (router) {
    this.router = router

    this.current = createRoute(null, { path: '/' })
  }

  transitionTo (path, cb) {
    const record = this.router.match(path)
    const route = createRoute(record, { path })
    if (path === this.current.path && route.matched.length === this.current.matched.length) {
      // route.matched.length === this.current.matched.length 用于兼容初始时路径皆为 /，但实例化时 null 对应的 matched 为 []，而初次自动调换对应的 matched.length 为 1
      return
    }

    // 跳转前执行相应的钩子函数
    const quene = this.router.beforeHooks
    // 迭代函数
    const iterator = (hook, next) => {
      hook(route, this.current, next)
    }

    runQuene(quene, iterator, () => {
      // 路径变化，实现跳转，渲染组件
      this.updateRoute(route)

      cb && cb()
    })
  }

  listen (cb) {
    this.cb = cb
  }

  updateRoute (route) {
    // 将 this.current 属性变为响应式，后续修改 current 就会自动渲染组件
    // 在 router-view 组件中使用 current 属性，路径变化就会更新 router-view
    this.current = route // 改变 current
    this.cb && this.cb(route) // 改变 _route
  }
}