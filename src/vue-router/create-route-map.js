export function createRouteMap (routes, oldPathMap) {
  // 方法重载
  // 如果有 oldPathMap，需要将 routes 格式化后放入到 oldPathMap 中形成新的 pathMap

  let pathMap = oldPathMap || {}

  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })

  return {
    pathMap
  }
}

function addRouteRecord (route, pathMap, parent) {
  const path = parent ? parent.path + '/' + route.path : route.path
  const record = {
    path,
    component: route.component,
    props: route.props || {},
    parent
  }

  pathMap[path] = record

  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathMap, record) // 传递父路径
    })
  }
}