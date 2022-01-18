import * as wasm from './lib/pkg/lib' // import wasm
import { reactive } from "vue"
import {SOT} from './SOT'
import * as buffer from "buffer"; // import data from SOT.ts

export enum NoiseType {
    White = 0,
    Sine,
    Square
}

let data = reactive(SOT)

const bufferSize = 512

let audioCtx = new (window.AudioContext)()

let startTime: number

/*
// Create a white noise generator
let gen = wasm.BufferGen.new(BigInt(9))

// Create filters
let filters = [wasm.RbjFilter.new(wasm.FilterType.Peak, audioCtx.sampleRate), wasm.RbjFilter.new(wasm.FilterType.Peak, audioCtx.sampleRate)]

// Create oscillators
let oscillators = [wasm.Oscillator.new(audioCtx.sampleRate), wasm.Oscillator.new(audioCtx.sampleRate)]
*/
let buffers_rendered = 0

let sources: AudioBufferSourceNode[] = []

function playBuffer() {
    // Create audio source
    sources.push(new AudioBufferSourceNode(audioCtx))

    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    let buffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        // Get empty channel
        let nowBuffering = buffer.getChannelData(channel)

        /*
        // White noise
        if (data.typeOfNoise === NoiseType.White) nowBuffering = gen.generate(nowBuffering)

        // Sine wave
        if (data.typeOfNoise === NoiseType.Sine) nowBuffering = oscillators[channel].sine(nowBuffering, data.frequency)

        // Square wave
        if (data.typeOfNoise === NoiseType.Square) nowBuffering = oscillators[channel].square(nowBuffering, data.frequency)

        filters[channel].calculate_coefficients(Math.pow((data.filterFreq - 20) / 19980, 2.5) * 19980 + 20, data.filterQ, data.filterStrength)
        nowBuffering = filters[channel].filter(nowBuffering)

        nowBuffering = wasm.gain_db(nowBuffering, data.gain)
        */

        let emptyBuffer = nowBuffering

        for (let track in SOT.tracks) {
            let trackBuffer = emptyBuffer
            for (let plugin in SOT.tracks[track].plugins) {
                trackBuffer = SOT.tracks[track].plugins[plugin].process(trackBuffer)
            }
            nowBuffering = wasm.sum(nowBuffering, trackBuffer)
        }
        console.log(nowBuffering)

        // Add generated buffer to the AudioBuffer
        buffer.copyToChannel(nowBuffering, channel)
    }

    // Put buffer into source
    sources[buffers_rendered].buffer = buffer

    // Connect
    sources[buffers_rendered].connect(audioCtx.destination)

    // Play
    sources[buffers_rendered].start(startTime + (buffers_rendered * (bufferSize/audioCtx.sampleRate)))

    buffers_rendered++
}

function fillBuffers() {
    while (data.playing && (startTime + (buffers_rendered * bufferSize / audioCtx.sampleRate) - audioCtx.currentTime) < 0.1) {
        playBuffer()
    }
    if (data.playing) {
        setTimeout(fillBuffers, 0.05)
    } else {
        buffers_rendered = 0
        sources = []
    }
}

export function play() {
    startTime = audioCtx.currentTime
    fillBuffers()
    
}

export function stop() {
    for (let source in sources) {
        sources[source].stop()
    }
}
