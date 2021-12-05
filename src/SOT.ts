import { reactive } from "vue";
import { BufferGen } from "./lib/pkg/lib";
import {Track} from './track'

export enum NoiseType {
    White = 0,
    Sine,
    Square
}

export const SOT = reactive({
    viewsOpen: {
        channelRack: true
    },
    playing: false,
    tracks: <Track[]>[],
    track_number: 0,
    selected_track: 0,
    frequency: 440,
    filterFreq: 440,
    filterStrength: 1,
    filterQ: 1,
    typeOfNoise: NoiseType.White,
    gen: BufferGen.new(BigInt(2)),
})
