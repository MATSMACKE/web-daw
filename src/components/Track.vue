<template>
    <div v-if="data !== undefined && index !== undefined" class="track" @click="selected_track = index" >
        <div class="track-content">
            Content
        </div>
        <div class="track-info" v-bind:style="{background: selected_track === index ? '#DDDDDD' : data.color, color: selected_track === index ? '#222' : '#DDD'}">
            <h1 class="track-name" v-if="selected_track !== index">{{data.name}}</h1>
            <textarea class="track-name-edit" rows="1" v-model="data.name" v-else @keydown.enter.prevent=""></textarea>
        </div>
    </div>
    <h1 v-else>Track component missing data or index prop</h1>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Track} from "@/track"
import {SOT} from "@/SOT"

export default defineComponent({
    name: 'ToolBar',
    props: {
        data: Track,
        index: Number
    },
    data() {
        return SOT
    },
    methods: {
    }
})
</script>

<style scoped lang="scss">
$track-info-width: 128px;
.track {
    flex-basis: 72px;
    width: 100%;
    flex-shrink: 0;
    border-bottom: #3f3f3f 1px solid;

    display: flex;
    flex-direction: row;
}
.track-info {
    flex-basis: $track-info-width;
    flex-shrink: 0;
}
.track-content {
    flex-grow: 1;
}

.track-name {
    font-size: 12pt;
    padding: 5px;
    width: calc($track-info-width - 10px);
    background-color: transparent;
    font-family: Helvetica, Arial, sans-serif;
    text-align: left;
    margin: 0;
}

.track-name-edit {
    font-size: 12pt;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    width: calc($track-info-width - 10px);
    padding: 5px;
    background-color: transparent;
    border: none;
    resize: none;
    margin: 0;
}
</style>
