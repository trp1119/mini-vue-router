import { createRouteMap } from "./create-route-map"

export function createrMatcher (routes) {
  
  // 创建映射表
  const { pathMap } = createRouteMap(routes)

  // 在 pathMap 中找到对应的记录
  function match (path) {
    return pathMap[path]
  }
  
  // 动态路由的实现就是 将新的路由加入到老的路由映射表中
  function addRoutes (routes) {
    createRouteMap(routes, pathMap) // 将新路由添加到 pathMap
  }

  return {
    match,
    addRoutes
  }
}