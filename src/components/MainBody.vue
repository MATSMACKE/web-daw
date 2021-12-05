<template>
    <div class="mid-container">
        <div class="mainbody-container">
            <button @click="playPause">{{ playing ? "Pause" : "Play" }}</button>
            <button @click="addTrack">Add track</button>
            <h1>Number of tracks: {{ track_number }}</h1>
            <button @click="toggleChannelRack">{{ viewsOpen.channelRack ? "Hide Channel Rack" : "Show Channel Rack" }}
            </button>
            <button @click="changeNoise('White')">White</button>
            <button @click="changeNoise('Sine')">Sine</button>
            <button @click="changeNoise('Square')">Square</button>
            <input id="osc-freq" type="range" v-model="frequency" min='20' max='1000'>
            <label for="osc-freq">Oscilator Frequency</label>
            <input id="filter-freq" type="range" v-model="filterFreq" min='20' max='10000'>
            <label for="filter-freq">Filter Frequency</label>
            <input id="filter-strength" type="range" v-model="filterStrength" min='-24' max='24'>
            <label for="filter-strength">Filter Strength</label>
            <input id="filter-q" type="range" v-model="filterQ" min='0.01' max='12'>
            <label for="filter-q">Filter Q</label>
        </div>
        <div class="tracks-container">

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {play, stop} from "@/audio";
import {SOT, NoiseType} from "@/SOT";
import {Track} from "@/track";

export default defineComponent({
    name: "MainBody",
    data() {
        return SOT
    },
    methods: {
        playPause(): void {
            if (!this.playing) {
                this.playing = true
                play()
            } else {
                this.playing = false
                stop()
            }
        },
        addTrack(): void {
            this.tracks.push(new Track((this.tracks.length + 1).toString()))
            this.track_number++
        },
        toggleChannelRack(): void {
            this.viewsOpen.channelRack = !this.viewsOpen.channelRack
        },
        changeNoise(type: string): void {
            switch (type) {
                case "White":
                    this.typeOfNoise = NoiseType.White
                    break
                case "Sine":
                    this.typeOfNoise = NoiseType.Sine
                    break
                case "Square":
                    this.typeOfNoise = NoiseType.Square
                    break
            }
        }
    }
})
</script>

<style scoped lang="scss">
.mid-container {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.tracks-container {
    flex-basis: 200px;
    flex-shrink: 0;
    background-color: azure;
}
.mainbody-container {
    flex-grow: 1;
    button {
        margin: 0.25em;
    }
}
</style>
