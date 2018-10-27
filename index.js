const init = callback => new MutationObserver(callback)
const start = (state, target, config) => state.observe(target, config)
const stop = state => state.disconnect()

const prototypes = { init, start, stop }

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$observer', {
      get () {
        return Object.assign({}, prototypes)
      }
    })
  }
}
