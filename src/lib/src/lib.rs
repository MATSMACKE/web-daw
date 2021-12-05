use wasm_bindgen::prelude::*;
use oorandom;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub struct BufferGen {
    gen: oorandom::Rand32,
}

#[wasm_bindgen]
impl BufferGen {
    pub fn new(seed: u64) -> Self {
        Self {
            gen: oorandom::Rand32::new(seed)
        }
    }

    pub fn generate(&mut self, mut arr: Vec<f32>) -> Vec<f32> {
        for i in &mut arr {
            *i = self.gen.rand_float() - 0.5;
        }
        arr
    }
}

#[wasm_bindgen]
pub struct Oscillator {
    cycle: u128,
    samplerate: f32
}

#[wasm_bindgen]
impl Oscillator {
    pub fn new(samplerate: f32) -> Self {
        Oscillator {
            cycle: 0,
            samplerate
        }
    }

    pub fn sine(&mut self, mut input: Vec<f32>, freq: f32) -> Vec<f32> {
        let mult = std::f32::consts::TAU * freq / (self.samplerate);
        for i in &mut input {
            *i = 0.5 * (self.cycle as f32 * mult).sin();
            self.cycle += 1;
        }
        input
    }

    pub fn square(&mut self, mut input: Vec<f32>, freq: f32) -> Vec<f32> {
        let mult = std::f32::consts::TAU * freq / (self.samplerate as f32);
        for i in &mut input {
            *i = 0.5 * ( if (self.cycle as f32 * mult).sin() > 0. { 1. } else { -1. } );
            self.cycle += 1;
        }
        input
    }
}

#[wasm_bindgen]
pub fn sine(mut arr: Vec<f32>, freq: f32, samplerate: u32) -> Vec<f32> {
    let mut x: f32 = 0.;
    let mult = std::f32::consts::TAU * freq / (samplerate as f32);
    for i in &mut arr {
        *i = 0.5 * (x * mult).sin();
        x += 1.;
    }
    arr
}

#[wasm_bindgen]
pub fn square(mut arr: Vec<f32>, freq: f32, samplerate: u32) -> Vec<f32> {
    let mut x: f32 = 0.;
    let mult = std::f32::consts::TAU * freq / (samplerate as f32);
    for i in &mut arr {
        *i = 0.5 * ( if (x * mult).sin() > 0. { 1. } else { -1. } );
        x += 1.;
    }
    arr
}

#[wasm_bindgen]
pub struct LowPassFilter {
    samplerate: f32,
    frequency: f32,
    temp: f32,
}

#[wasm_bindgen]
impl LowPassFilter {
    pub fn new(start_freq: f32, samplerate: f32, filter_type: FilterType) -> Self {
        LowPassFilter {
            samplerate,
            frequency: start_freq,
            temp: 0.0,
        }
    }

    pub fn filter(&mut self, mut input: Vec<f32>, freq: f32) -> Vec<f32> {
        // https://en.wikipedia.org/wiki/Low-pass_filter#Simple_infinite_impulse_response_filter

        self.frequency = freq;
        let rc: f32 = 1.0 / (self.frequency * std::f32::consts::TAU);
        let time_per_sample = 1.0 / self.samplerate;
        let smoothing_factor = time_per_sample / (rc + time_per_sample);

        for sample in &mut input {
            *sample = self.temp + smoothing_factor * (*sample - self.temp);
            self.temp = *sample;
        }
        input
    }

    pub fn dyn_filter(&mut self, mut input: Vec<f32>, freq: Vec<f32>) -> Vec<f32> {
        self.frequency = freq[0];
        let time_per_sample = 1.0 / self.samplerate;

        for (i, sample) in input.iter_mut().enumerate() {
            let rc: f32 = 1.0 / (freq[i] * std::f32::consts::TAU);
            let smoothing_factor = time_per_sample / (rc + time_per_sample);

            *sample = self.temp + smoothing_factor * (*sample - self.temp);
            self.temp = *sample;
        }
        input
    }
}

#[wasm_bindgen]
pub enum FilterType {
    Lowpass,
    Highpass,
    Peak,
    LowShelf,
    HighShelf,
    BandPass
}

#[wasm_bindgen]
pub struct RbjFilter {
    filter_type: FilterType,
    tmp_in: (f32, f32),
    tmp_out: (f32, f32),
    sample_rate: f32,
    filtercoeffs: (f32, f32, f32, f32, f32)
}

#[wasm_bindgen]
impl RbjFilter {
    // https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html
    pub fn new(filter_type: FilterType, sample_rate: f32) -> Self {
        RbjFilter {
            tmp_in: (0., 0.),
            tmp_out: (0., 0.),
            filter_type,
            sample_rate,
            filtercoeffs: (0., 0., 0., 0., 0.)
        }
    }

    pub fn change_type(&mut self, filter_type: FilterType) {
        self.filter_type = filter_type
    }

    pub fn calculate_coefficients(&mut self, freq: f32, q: f32, gain: f32) {
        let omega = std::f32::consts::TAU * freq / self.sample_rate;
        let cos_omega = omega.cos();
        let sin_omega = omega.sin();
        let alpha = sin_omega / (2. * q);

        let b0: f32;
        let b1: f32;
        let b2: f32;
        let a0: f32;
        let a1: f32;
        let a2: f32;

        match self.filter_type {
            FilterType::Lowpass => {
                b0 = (1. - cos_omega) / 2.;
                b1 = 1. - cos_omega;
                b2 = (1. - cos_omega) / 2.;
                a0 = 1. + alpha;
                a1 = -2. * cos_omega;
                a2 = 1. - alpha;
            },
            FilterType::Highpass => {
                b0 = (1. + cos_omega) / 2.;
                b1 = -1. - cos_omega;
                b2 = (1. + cos_omega) / 2.;
                a0 = 1. + alpha;
                a1 = -2. * cos_omega;
                a2 = 1. - alpha;
            },
            FilterType::Peak => {
                let ten: f32 = 10.;
                let a: f32 = ten.powf(gain/40.);
                b0 = 1. + alpha * a;
                b1 = -2. * cos_omega;
                b2 = 1. - alpha * a;
                a0 = 1. + alpha / a;
                a1 = -2. * cos_omega;
                a2 = 1. - alpha / a;
            },
            FilterType::LowShelf => {
                let ten: f32 = 10.;
                let a: f32 = ten.powf(gain/40.);
                b0 = a * ((a + 1.) - (a - 1.) * cos_omega + 2. * a.sqrt() * alpha);
                b1 = 2. * a * ((a - 1.) - (a + 1.) * cos_omega);
                b2 = a * ((a + 1.) - (a - 1.) * cos_omega - 2. * a.sqrt() * alpha);
                a0 = (a + 1.) - (a - 1.) * cos_omega + 2. * a.sqrt() * alpha;
                a1 = -2. * ((a - 1.) + (a - 1.) * cos_omega);
                a2 = (a + 1.) + (a - 1.) * cos_omega - 2. * a.sqrt() * alpha;
            },
            FilterType::HighShelf => {
                let ten: f32 = 10.;
                let a: f32 = ten.powf(gain/40.);
                b0 = a * ((a + 1.) + (a - 1.) * cos_omega + 2. * a.sqrt() * alpha);
                b1 = -2. * a * ((a - 1.) + (a + 1.) * cos_omega);
                b2 = a * ((a + 1.) + (a - 1.) * cos_omega - 2. * a.sqrt() * alpha);
                a0 = (a + 1.) - (a - 1.) * cos_omega + 2. * a.sqrt() * alpha;
                a1 = 2. * ((a - 1.) - (a + 1.) * cos_omega);
                a2 = (a + 1.) - (a - 1.) * cos_omega - 2. * a.sqrt() * alpha;
            },
            FilterType::BandPass => {
                b0 = q * alpha;
                b1 = 0.;
                b2 = -q * alpha;
                a0 = 1. + alpha;
                a1 = -2. * cos_omega;
                a2 = 1. - alpha;
            }
        }
        self.filtercoeffs.0 = b0 / a0;
        self.filtercoeffs.1 = b1 / a0;
        self.filtercoeffs.2 = b2 / a0;
        self.filtercoeffs.3 = a1 / a0;
        self.filtercoeffs.4 = a2 / a0;
    }

    pub fn filter(&mut self, mut input: Vec<f32>) -> Vec<f32> {
        for x in &mut input {
            let sample = self.filtercoeffs.0 * (*x) + self.filtercoeffs.1 * self.tmp_in.0 + self.filtercoeffs.2 * self.tmp_in.1 - self.filtercoeffs.3 * self.tmp_out.0 - self.filtercoeffs.4 * self.tmp_out.1;
            self.tmp_in.1 = self.tmp_in.0;
            self.tmp_in.0 = *x;
            self.tmp_out.1 = self.tmp_out.0;
            self.tmp_out.0 = sample;
            *x = sample;
        }
        input
    }
}