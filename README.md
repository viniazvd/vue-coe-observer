<h1 align="center">vue-coe-observer ✅</h1>

<p align="center">
  <q>based on <b>MutationObserver API</b></q>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

**Install**

`yarn add vue-coe-observer`

**Include Plugin**
```javascript
import Vue from 'vue'

import VueCoeObserver from 'vue-coe-observer'

Vue.use(VueCoeObserver)
```

**Full documentation**
- https://developer.mozilla.org/pt-BR/docs/Web/API/MutationObserver

**Example usage**
```vue
<template>
  <div id="app">
    <div>
      <div ref="target1">
        <div v-for="item1 in items1" :key="item1.name">{{ item1.id }}</div>
      </div>

      <hr>

      <div ref="target2">
        <div v-for="item2 in items2" :key="item2.name">{{ item2.id }}</div>
      </div>
    </div>
  </div>
</template>

<script>
function getRandomColor () {
  const letters = '0123456789ABCDEF'

  let color = '#'
  for (let i = 0; i < 6; i++) color += letters[ Math.floor(Math.random() * 16) ]

  return color
}

export default {
  name: 'app',

  data () {
    return {
      obs1: {},
      obs2: {},
      items1: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ],
      items2: [
        { id: 11 },
        { id: 22 },
        { id: 33 }
      ]
    }
  },

  mounted () {
    const config = { attributes: true, childList: true, characterData: true }
    const callback = (target, mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.$refs.target.style.color = getRandomColor()
        }
      }
    }
    
    const target1 = this.$refs.target1
    const target2 = this.$refs.target2

    this.obs1 = this.$observer.init(target1, callback)
    this.$observer.start(this.obs1, target1, config)

    this.obs2 = this.$observer.init(target2, callback)
    this.$observer.start(this.obs2, target2, config)

    setTimeout(() => {
      this.items1.push({ id: 4 })
      this.items2.push({ id: 44 })
    }, 3000)

    setTimeout(() => {
      this.items1.push({ id: 5 })
      this.items2.push({ id: 55 })
      this.$observer.stop(this.obs2)
    }, 7000)

    setTimeout(() => {
      this.$observer.stop(this.obs1)
      this.items1.push({ id: 6 })
      this.items2.push({ id: 66 })
    }, 10000)
  }
}
</script>
```
