<template>
<div class="track-container" @click.right.prevent="openContextMenu" @click.left="global.selected_track = index ?? 0; contextmenu.show = global.contextmenu = false">
    <div v-if="data !== undefined && index !== undefined" class="track" >
        <div class="track-content">
            Content
        </div>
        <div class="track-info" v-bind:style="{background: global.selected_track === index ? '#DDDDDD' : data.color, color: global.selected_track === index ? '#222' : '#DDD'}">
            <h1 class="track-name" v-if="global.selected_track !== index">{{data.name}}</h1>
            <textarea class="track-name-edit" rows="1" v-model="data.name" v-else @keydown.enter.prevent=""></textarea>
        </div>
    </div>
    <h1 v-else>Track component missing data or index prop</h1>
</div>
<ContextMenu :x="contextmenu.x" :y="contextmenu.y" v-if="contextmenu.show = global.contextmenu && contextmenu.show">
    <ul>
        <li>Hello World</li>
    </ul>
</ContextMenu>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Track} from "@/track"
import {SOT} from "@/SOT"
import ContextMenu from "./ContextMenu.vue"

export default defineComponent({
    name: 'ToolBar',
    components: {
        ContextMenu
    },
    props: {
        data: Track,
        index: Number
    },
    data() {
        return { 
            global: SOT, 
            contextmenu: {
                show: false,
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        openContextMenu(e: MouseEvent): void {
            if (!this.global.contextmenu) {
                this.contextmenu.show = this.global.contextmenu = true
            }
            this.contextmenu.x = e.pageX
            this.contextmenu.y = e.pageY
        }
    }
})
</script>

<style scoped lang="scss">
$track-info-width: 128px;
$track-height: 72px;

.track-container {
    flex-basis: $track-height;
    flex-shrink: 0;
}
.track {
    width: 100%;
    height: $track-height;
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
