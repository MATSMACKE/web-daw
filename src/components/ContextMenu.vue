<template>
  <div class="contextmenu" v-bind:style="{left: x + 'px', top: y + 'px'}">
    <p>{{x}}, {{y}}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SOT } from "@/SOT"

export default defineComponent({
  name: "ContextMenu",
  props: {
    x: Number,
    y: Number
  },
  data() {
    return SOT
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  left: 400;
  top: 600
}
</style>