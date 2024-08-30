export default {
  functional: true, // 函数式组件，会导致 render 中没有 this。正常的组件是类，函数式组件是普通函数。函数式组件不用产生实例，性能更好。函数式组件是无状态的，无 data，纯展示。
  render (h, { parent, data }) {
    const route = parent.$route

    // 依次将 matched 的结果赋予 router-view

    let depth = 0
    while(parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    const record = route.matched[depth]
    if (!record) {
      return h()
    }

    data.routerView = true

    return h(record.component, data) // <router-view routerView=true><router-view>
  }
}