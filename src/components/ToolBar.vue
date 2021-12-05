<template>
    <div class="toolbar-container">
        <h5 @mouseenter="show = true" @mouseleave="show = false">DAW</h5>
        <h5>File</h5>
        <h5>Edit</h5>
        <h5>Select</h5>
        <h5>Insert</h5>

        <h5 v-if="show">test2</h5>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'ToolBar',
    props: {
        msg: String
    },
    data() {
        return {
            show: false
        }
    }
})
</script>

<style scoped lang="scss">
.toolbar-container {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    flex-basis: 1.5rem;
    flex-shrink: 0;
    h5 {
        margin-top: 0;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        padding-inline: 0.5em;
    }

    h5:hover {
        color: #1b1b1b;;
        background-color: #dddddd;
    }
}
</style>
