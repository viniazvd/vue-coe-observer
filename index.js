const init = callback => new MutationObserver(callback)
const start = (state, target, config) => state.observe(target, config)
const stop = state => state.disconnect()

const uuidv1 = require('uuid/v1')

const prototypes = { init, start, stop }

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$observer', {
      get () {
        return Object.assign({}, prototypes)
      }
    })

    Vue.mixin({
      mounted () {
        const { observe } = this.$options
        if (!observe) return

        Object
          .entries(observe)
          .forEach(([ key, value ]) => {
            const uniqueKey = uuidv1()

            Vue.set(this.observers, key, uniqueKey)

            this.observers[key] = init(value['callback'])
            start(this.observers[key], value['target'](), value['config'])
          })
      },

      data () {
        return {
          observers: {}
        }
      }
    })
  }
}
