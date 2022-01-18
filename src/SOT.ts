import { reactive } from "vue";
import { BufferGen } from "./lib/pkg/lib";
import { NoiseType } from "@/audio"
import {Track} from './track'

export const SOT = reactive({
    viewsOpen: {
        channelRack: true,
        contextMenu: false
    },
    playing: false,
    tracks: <Track[]>[new Track("New", "blue")],
    selected_track: 0,
    contextmenu: false
})
