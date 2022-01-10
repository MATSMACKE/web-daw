<template>
    <div class="toolbar-container">
        <h5>DAW</h5>
        <h5>File</h5>
        <h5>Edit</h5>
        <h5>Select</h5>
        <h5>Insert</h5>
        <button @click="playPause()">PLAY</button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {play, stop} from "@/audio";
import {SOT} from "@/SOT"

export default defineComponent({
    name: 'ToolBar',
    data() {
        return SOT
    },
    methods: {
        playPause(): void {
            console.log("playpause")
            if (!this.playing) {
                this.playing = true
                play()
            } else {
                this.playing = false
                stop()
            }
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
