<template>
    <div class="channelrack-container">
        <div v-for="plugin in tracks[selected_track].plugins" class="plugin">

        </div>
        <div class="new-plugin-button" @click="add_plugin()">
            <h3>Add Plugin</h3>
        </div>
    </div>
</template>

<script lang="ts">
import {SOT} from "@/SOT";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ChannelRack",
    data() {
        return SOT
    },
    methods: {
        add_plugin() {
            this.tracks[this.selected_track].new_plugin("New Plugin")
        }
    }
})
</script>

<style scoped lang="scss">
    .channelrack-container {
        background-color: #2b2b2b;
        padding: 0;
        flex-basis: 15rem;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        overflow-x: scroll;

        * {
            margin-left: 5px;
            margin-right: 5px;
        }

        h5 {
            padding: 0;
            margin: 0;
        }

        .plugin {
            flex-basis: 100px;
            flex-shrink: 0;
            background-color: grey;
        }

        .new-plugin-button {
            flex-basis: 100px;
            flex-shrink: 0;
            cursor: pointer;
        }
    }
</style>
