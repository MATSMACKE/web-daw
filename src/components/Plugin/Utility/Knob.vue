<template>
  <div class="knob" v-bind:style="{transform: `rotate2d(${(value - min) / (max - min) * 180}deg)`}"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SOT } from "@/SOT"

export default defineComponent({
  name: "ContextMenu",
  props: {
    input_scaling: Function,
    default: Number,
    min: Number,
    max: Number
  },
  data() {
    return {
        label: String,
        value: 0
    }
  },
  methods: {
      mounted() {
          this.value = this.default ?? 0
      },
      updateEvent() {
          this.$emit("updated", this.value)
      }
  },
})
</script>

<style lang="scss" scoped>

</style>