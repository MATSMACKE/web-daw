type ProcessorFunction = (input: Float32Array) => Float32Array

export class Processor {
    state: any
    process: ProcessorFunction

    constructor(process: ProcessorFunction, state: Object) {
        this.process = process
        this.state = state
    }
}

export class Plugin {
    processors: Processor[]
    name: string

    constructor() {
        this.processors = []
        this.name = "Generic Plugin"
    }

    process(input: Float32Array): Float32Array {
        for (let processor in this.processors) {
            input = this.processors[processor].process(input)
        }
        return input
    }
}
