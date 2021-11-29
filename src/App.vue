<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <button @click="inc">{{value}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import {SOT} from './SOT'
import * as wasm from './lib/pkg/lib'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return SOT
  },
  computed: {
    value(): Number {
      return wasm.add(this.count, 1)
    }
  },
  methods: {
    inc() {
      this.count = wasm.add(this.count, 1)
    }
  }
})
</script>

<style lang="scss">

</style>
