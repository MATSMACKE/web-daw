<template>
<div class="maincompcontainer">
    <TrackComponent v-for="(track, index) in tracks" :data="track" :index="index"/>
    <button id="new-track-button" @click="newTrack(`Track ${tracks.length + 1}`, `#4433aa`)">+ New Track</button>
</div>
</template>

<script lang="ts">
import {SOT} from "@/SOT";
import {Track} from "@/track"
import { defineComponent } from "vue";
import TrackComponent from "./Track.vue"

export default defineComponent({
    name: "MainComp",
    components: {
        TrackComponent
    },
    data() {
        return SOT
    },
    methods: {
        newTrack(name: string, color: string) {
            this.tracks.push(new Track(name, color))
        }
    }
})
</script>

<style scoped>
.maincompcontainer {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-x: scroll;
    overflow-y: scroll;
}


#new-track-button {
    margin-inline: auto;
    margin-block: 0.5rem;
}
</style>
