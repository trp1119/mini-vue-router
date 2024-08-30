import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter) // 注册两个全局组件 router-view router-link，以及 $router $route

const router = new VueRouter({
  mode: 'history', // 在开发环境下，服务器默认启用 historyfallback 插件，不会导致 history 的 404，但生成环境会
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      children: [
        {
          path: 'a',
          component: {
            render: () => <h1>about - a</h1>
          }
        },
        {
          path: 'b',
          component: {
            render: () => <h1>about - b</h1>
          }
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  console.log('1', to, from)
  next()
})

router.beforeEach((to, from, next) => {
  console.log('2', to, from)
  next()
})

