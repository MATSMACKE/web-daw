import * as wasm from './lib/pkg/lib'

var audioCtx = new (window.AudioContext)();

let gen = wasm.BufferGen.new(BigInt(9))

// Create an empty three-second stereo buffer at the sample rate of the AudioContext
var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);

// Fill the buffer with white noise;
// just random values between -1.0 and 1.0
for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
  // Get empty channel
  var nowBuffering = myArrayBuffer.getChannelData(channel);

  // White noise
  //nowBuffering = gen.generate(nowBuffering)

  // Sine wave
  nowBuffering = wasm.sine(nowBuffering, 440, audioCtx.sampleRate)

  // Square wave
  nowBuffering = wasm.square(nowBuffering, 440, audioCtx.sampleRate)

  console.log(nowBuffering);
  myArrayBuffer.copyToChannel(nowBuffering, channel)
}

// Create audio source
var source = audioCtx.createBufferSource();

// Put buffer into source
source.buffer = myArrayBuffer;

// Connect
source.connect(audioCtx.destination);

export function audio() {
    // Start the audio
    source.start();
}