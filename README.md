<h1 align="center">vue-coe-observer ✅</h1>

<p align="center">
  <a href="#"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

# Why do I need it? #

Mutation Summary does five main things for you:

  * **It tells you how the document is different now from how it was.** 
  * **It handles any and all changes, no matter how complex.** 
  * **It lets you express what kinds of things you’re interested in.** 
  * **It’s fast.** 
  * **It can automatically ignore changes you make during your callback.** 
  
# Where can Mutation Summary be used? #

The Mutation Summary library depends on the presence of the Mutation Observer DOM API. Mutation Observers are available in

* Google Chrome
* Firefox
* Safari
* Opera
* IE11

**Install**

`yarn add vue-coe-observer`

**Include Plugin**
```javascript
import Vue from 'vue'

import VueCoeObserver from 'vue-coe-observer'

Vue.use(VueCoeObserver)
```

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
    const config = { childList: true }
    const callback = mutations => {
      return mutations.forEach(mutation => {
        if (mutation.type === 'childList') target1.style.color = getRandomColor()
      })
    }
    
    const target1 = this.$refs.target1
    const target2 = this.$refs.target2

    this.obs1 = this.$observer.init(callback)
    this.$observer.start(this.obs1, target1, config)

    this.obs2 = this.$observer.init(callback)
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

or

```vue
<template>
  <div id="app">
    <div>
      <div ref="target1" class="target1">
        <div v-for="item1 in items1" :key="item1.id">{{ item1.id }}</div>
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
      items1: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    }
  },

  observe: {
    target1: {
      target: () => document.querySelector('.target1'),
      callback: mutations => {
        return mutations.forEach(mutation => {
          if (mutation.type === 'childList') document.querySelector('.target1').style.color = getRandomColor()
        })
      },
      config: { childList: true }
    }
  },

  mounted () {
    setTimeout(() => {
      this.items1.push({ id: 4 })
    }, 3000)
    setTimeout(() => {
      this.items1.push({ id: 5 })
    }, 7000)
    setTimeout(() => {
      this.$observer.stop(this.observers.target1)
      this.items1.push({ id: 6 })
    }, 10000)
  }
}
</script>

```

