use rand::prelude::*;

pub struct Exp3 {
    gamma: f64,
    counts: Vec<usize>,
    values: Vec<f64>,
    rng: ThreadRng,
}

impl Exp3 {
    pub fn new(gamma: f64, n_arms: usize) -> Self {
        Self {
            gamma,
            counts: vec![0; n_arms],
            values: vec![0.0; n_arms],
            rng: rand::thread_rng(),
        }
    }

    pub fn initialize(&mut self, n_arms: usize) {
        self.counts = vec![0; n_arms];
        self.values = vec![0.0; n_arms];
    }

    pub fn select_arm(&mut self) -> usize {
        let n_arms = self.counts.len();
        let total_counts: usize = self.counts.iter().sum();
        let mut probs: Vec<f64> = vec![0.0; n_arms];
        for arm in 0..n_arms {
            probs[arm] = (1.0 - self.gamma) * (self.values[arm] / self.values.iter().sum::<f64>())
                + self.gamma / n_arms as f64;
        }
        let mut p = self.rng.gen::<f64>();
        let mut i = 0;
        while p > 0.0 {
            p -= probs[i];
            i += 1;
        }
        i - 1
    }

    pub fn update(&mut self, chosen_arm: usize, reward: f64) {
        self.counts[chosen_arm] += 1;
        let n = self.counts[chosen_arm];
        let value = self.values[chosen_arm];
        self.values[chosen_arm] = ((n - 1) as f64 / n as f64) * value + (1.0 / n as f64) * reward;
    }
}
