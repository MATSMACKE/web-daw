import * as wasm from '../lib/pkg/lib' // import wasm
import {Plugin, Processor} from "@/plugin"
import {NoiseType} from "@/audio"

class SimpleGeneratorProcessor extends Processor {
    constructor() {
        super((input: Float32Array) => {return input}, {})
        this.state = {
            gen: wasm.BufferGen.new(BigInt(5))
        }

        this.process = (input: Float32Array) => {
            return wasm.gain_abs(this.state.gen.generate(input), 0.5)
        }
    }
}

export class SimpleGenerator extends Plugin {
    constructor() {
        super()
        this.processors = [new SimpleGeneratorProcessor()]
        this.name = "White Noise"
    }
}