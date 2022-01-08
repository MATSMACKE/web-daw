type ProcessorFunction = (input: Float32Array) => Float32Array

class Processor {
    state: object
    process: ProcessorFunction

    constructor(process: ProcessorFunction) {
        this.process = process
        this.state = {}
    }
}

export class Plugin {
    processors: Processor[]

    constructor() {
        this.processors = []
    }
}
