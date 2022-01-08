<template>
<div class="maincompcontainer">
    <div class="track" v-for="(track, index) in tracks" @click="selectTrack(index)">
        <div class="track-content">
            Content
        </div>
        <div class="track-info" v-bind:style="{background: selected_track === index ? '#DDDDDD' : track.color, color: selected_track === index ? '#222' : '#DDD'}">
            <h1>{{track.name}}</h1>
        </div>
    </div>
    <button id="new-track-button" @click="newTrack(`Test`, `#4433aa`)">+ New Track</button>
</div>
</template>

<script lang="ts">
import {SOT} from "@/SOT";
import {Track} from "@/track"
import { defineComponent } from "vue";

export default defineComponent({
    name: "MainComp",
    data() {
        return SOT
    },
    methods: {
        selectTrack(index: number) {
            this.selected_track = index
        },
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
.track {
    flex-basis: 72px;
    width: 100%;
    flex-shrink: 0;
    border-bottom: #3f3f3f 1px solid;

    display: flex;
    flex-direction: row;
}
.track-info {
    flex-basis: 100px;
    flex-shrink: 0;
}
.track-content {
    flex-grow: 1;
}

#new-track-button {
    margin-inline: auto;
    margin-block: 0.5rem;
}
</style>
