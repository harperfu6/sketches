use crate::agent::Agent;
use rand::prelude::*;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct Random {
    values: Vec<f64>,
}

#[wasm_bindgen]
impl Random {
    pub fn new(n_arms: usize) -> Self {
        Self {
            values: vec![0.; n_arms],
        }
    }

    pub fn call_select_arm(&self) -> usize {
        self.select_arm()
    }

    pub fn call_reset(&mut self, n_arms: usize) {
        self.reset(n_arms)
    }

    pub fn call_update(&mut self, chosen_arm: usize, reward: f64) {
        self.update(chosen_arm, reward)
    }
}

impl Agent for Random {
    fn select_arm(&self) -> usize {
        let mut rng = rand::thread_rng();
        // Select a random arm with probability epsilon
        rng.gen_range(0..self.values.len())
    }

    fn reset(&mut self, n_arms: usize) {
        {}
    }

    fn update(&mut self, chosen_arm: usize, reward: f64) {
        {}
    }
}
