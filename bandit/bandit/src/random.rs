use crate::agent::Agent;
use rand::prelude::*;

pub struct Random {
    values: Vec<f64>,
}

impl Random {
    pub fn new(n_arms: usize) -> Self {
        Self {
            values: vec![0.; n_arms],
        }
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
