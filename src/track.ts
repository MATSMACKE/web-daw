import * as wasm from './lib/pkg/lib'
import {Plugin} from './plugin'

export class Track {
    name: string
    buffer: AudioBuffer
    plugins: Plugin[]

    constructor(name: string = "New Track") {
        this.name = name
        this.buffer = new AudioBuffer({length: 1, sampleRate: 44100})
        this.plugins = []
    }
}
