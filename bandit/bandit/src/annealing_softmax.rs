use crate::Agent;
use rand::{distributions::WeightedIndex, prelude::*};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct AnnealingSoftmax {
    tau: f64,
    counts: Vec<usize>,
    values: Vec<f64>,
}

#[wasm_bindgen]
impl AnnealingSoftmax {
    pub fn new(n_arms: usize) -> Self {
        Self {
            tau: 1000.0,
            counts: vec![0; n_arms],
            values: vec![0.0; n_arms],
        }
    }

    pub fn name(&self) -> String {
        format!("Softmax(tau={})", self.tau)
    }

    pub fn reset(agent: &mut AnnealingSoftmax, n_arms: usize) {
        agent.reset(n_arms);
    }

    pub fn select_arm(agent: &AnnealingSoftmax) -> usize {
        agent.select_arm()
    }

    pub fn update(agent: &mut AnnealingSoftmax, chosen_arm: usize, reward: f64) {
        agent.update(chosen_arm, reward);
    }

    fn softmax(&self) -> Vec<f64> {
        let max_logit = self
            .values
            .iter()
            .map(|v| v / self.tau)
            .max_by(|a, b| (a).partial_cmp(b).unwrap())
            .unwrap();
        let sum_logit = self
            .values
            .iter()
            .map(|v| (v / self.tau) - max_logit)
            .sum::<f64>();

        self.values
            .iter()
            .map(|v| (v / self.tau) - max_logit)
            .map(|v| v.exp() - sum_logit.exp())
            .collect::<Vec<f64>>()
    }
}

impl Agent for AnnealingSoftmax {
    fn reset(&mut self, n_arms: usize) {
        self.tau = 1000.0;
        self.counts = vec![0; n_arms];
        self.values = vec![0.0; n_arms];
    }

    fn select_arm(&self) -> usize {
        let mut rng = rand::thread_rng();
        // if all values are same, select a random arm
        if self.values.iter().all(|&v| v == self.values[0]) {
            rng.gen_range(0..self.values.len())
        } else {
            let dist = WeightedIndex::new(&self.softmax()).unwrap();
            dist.sample(&mut rng)
        }
    }

    fn update(&mut self, chosen_arm: usize, reward: f64) {
        self.counts[chosen_arm] += 1;
        let n = self.counts[chosen_arm];
        let value = self.values[chosen_arm];
        self.values[chosen_arm] = ((n - 1) as f64 / n as f64) * value + (1.0 / n as f64) * reward;

        // annealing
        self.tau *= 0.9;
    }
}
