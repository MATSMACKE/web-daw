import * as wasm from './lib/pkg/lib'
import { readonly } from "vue";

import {SOT, NoiseType} from './SOT'

const data = readonly(SOT)

let audioCtx = new (window.AudioContext)();

let startTime: number

let gen = wasm.BufferGen.new(BigInt(9))

let filters = [wasm.RbjFilter.new(wasm.FilterType.Peak, audioCtx.sampleRate), wasm.RbjFilter.new(wasm.FilterType.Peak, audioCtx.sampleRate)]

let oscillators = [wasm.Oscillator.new(audioCtx.sampleRate), wasm.Oscillator.new(audioCtx.sampleRate)]

let buffers_rendered = 0

let sources = <AudioBufferSourceNode[]>[]

function playBuffer() {
    // Create audio source
    sources.push(new AudioBufferSourceNode(audioCtx))

    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    let myArrayBuffer = audioCtx.createBuffer(2, 512, audioCtx.sampleRate);

    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
        // Get empty channel
        let nowBuffering = myArrayBuffer.getChannelData(channel);

        // White noise
        if (data.typeOfNoise === NoiseType.White) nowBuffering = gen.generate(nowBuffering)

        // Sine wave
        if (data.typeOfNoise === NoiseType.Sine) nowBuffering = oscillators[channel].sine(nowBuffering, data.frequency)

        // Square wave
        if (data.typeOfNoise === NoiseType.Square) nowBuffering = oscillators[channel].square(nowBuffering, data.frequency)

        filters[channel].calculate_coefficients(data.filterFreq, data.filterQ, data.filterStrength)
        nowBuffering = filters[channel].filter(nowBuffering)

        // Add generated buffer to the AudioBuffer
        myArrayBuffer.copyToChannel(nowBuffering, channel)
    }

    // Put buffer into source
    sources[buffers_rendered].buffer = myArrayBuffer;

    // Connect
    sources[buffers_rendered].connect(audioCtx.destination);

    // Play
    sources[buffers_rendered].start(startTime + (buffers_rendered * (512/audioCtx.sampleRate)))

    buffers_rendered++

    console.log("playing")
}

function fillBuffers() {
    while (data.playing && (startTime + (buffers_rendered * 512 / audioCtx.sampleRate) - audioCtx.currentTime) < 0.1) {
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
