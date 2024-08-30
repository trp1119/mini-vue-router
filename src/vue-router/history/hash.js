import History from "./base";

function ensureHash () {
  if (!window.location.hash) {
    window.location.hash = '/'
  }
}

function getHash () {
  return window.location.hash.slice(1)
}

export default class HashHistory extends History {
  constructor (router) {
    super(router)

    // hash 路由初始化时，增加一个默认的 hash 值 /#/
    ensureHash()
  }

  getCurrentLocation () {
    return getHash()
  }

  setUpListener () {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }

  pushState (location) {
    window.location.hash = location // 更改 hash 值
  }
}