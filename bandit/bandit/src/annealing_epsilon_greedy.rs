use super::agent::Agent;
use rand::prelude::*;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct AnnealingEpsilonGreedy {
    pub epsilon: f64,
    values: Vec<f64>,
    counts: Vec<usize>,
}

#[wasm_bindgen]
impl AnnealingEpsilonGreedy {
    pub fn new(n_arms: usize) -> Self {
        Self {
            epsilon: 1.0,
            values: vec![0.; n_arms],
            counts: vec![0; n_arms],
        }
    }

    pub fn call_reset(&mut self, n_arms: usize) {
        self.reset(n_arms);
    }

    pub fn call_select_arm(&self) -> usize {
        self.select_arm()
    }

    pub fn call_update(&mut self, chosen_arm: usize, reward: f64) {
        self.update(chosen_arm, reward);
    }
}

impl Agent for AnnealingEpsilonGreedy {
    fn reset(&mut self, n_arms: usize) {
        self.epsilon = 1.0;
        self.values = vec![0.; n_arms];
        self.counts = vec![0; n_arms];
    }

    /// Select arm with the largest estimated value with probability 1 - epsilon,
    fn select_arm(&self) -> usize {
        let mut rng = rand::thread_rng();
        // if all valus are same, select a random arm
        if self.values.iter().all(|&x| x == self.values[0]) {
            rng.gen_range(0..self.values.len())
        } else {
            if rng.gen::<f64>() >= self.epsilon {
                // Select the best arm
                self.values
                    .iter()
                    .enumerate()
                    .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
                    .unwrap()
                    .0
            } else {
                // Select a random arm with probability epsilon
                rng.gen_range(0..self.values.len())
            }
        }
    }

    fn update(&mut self, chosen_arm: usize, reward: f64) {
        self.counts[chosen_arm] += 1;
        let n = self.counts[chosen_arm];
        let value = self.values[chosen_arm];
        self.values[chosen_arm] = ((n - 1) as f64 / n as f64) * value + (1.0 / n as f64) * reward;

        // annealing
        self.epsilon *= 0.99;
    }
}
