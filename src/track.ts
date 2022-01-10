import {Plugin} from './plugin'
import {SimpleGenerator} from "@/plugins/simple_gen"

export class Track {
    name: string
    color: string
    buffer: AudioBuffer
    plugins: Plugin[]

    constructor(name: string = "New Track", color: string = "red") {
        this.name = name
        this.buffer = new AudioBuffer({length: 1, sampleRate: 44100})
        this.plugins = []
        this.color = color
    }

    new_plugin(name: string): void {
        this.plugins.push(new SimpleGenerator())
    }
}