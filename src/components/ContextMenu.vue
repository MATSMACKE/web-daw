<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SOT } from "@/SOT"

export default defineComponent({
  name: "ContextMenu",
  data() {
    return SOT
  },
  methods: {},
})
</script>

<style lang="scss" scoped></style>