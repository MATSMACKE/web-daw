<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <button @click="inc">{{value}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import {SOT} from './SOT'
import * as wasm from './lib/pkg/lib'
import {audio} from './audio'

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
      //return wasm.add(this.count, 1)
      return this.count
    }
  },
  methods: {
    inc(): void {
      this.count = this.gen.generate(Float32Array.from([0., 0., 0.]))[0]
      console.log(this.gen.generate(Float32Array.from([0., 0., 0.])))

      audio()
    }
  }
})
</script>

<style lang="scss">

</style>
