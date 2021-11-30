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
pub fn greet() {
    alert("Hello, lib!");
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub struct BufferGen {
    gen: oorandom::Rand32
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
            *i = 2. * (self.gen.rand_float() - 0.5);
        }
        arr
    }
}

#[wasm_bindgen]
pub fn sine(mut arr: Vec<f32>, freq: f32, samplerate: u32) -> Vec<f32> {
    let mut x: f32 = 0.;
    let mult = std::f32::consts::TAU * freq / (samplerate as f32);
    for i in &mut arr {
        *i = (x*mult).sin();
        x += 1.;
    }
    arr
}

#[wasm_bindgen]
pub fn square(mut arr: Vec<f32>, freq: f32, samplerate: u32) -> Vec<f32> {
    let mut x: f32 = 0.;
    let mult = std::f32::consts::TAU * freq / (samplerate as f32);
    for i in &mut arr {
        *i = if (x*mult).sin() > 0. {1.} else {-1.};
        x += 1.;
    }
    arr
}