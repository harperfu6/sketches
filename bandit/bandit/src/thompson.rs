// use rand::prelude::*;

// pub struct Thompson {
//     counts: Vec<usize>,
//     values: Vec<f64>,
//     rng: ThreadRng,
// }

// impl Thompson {
//     pub fn new(n_arms: usize) -> Self {
//         Self {
//             counts: vec![0; n_arms],
//             values: vec![0.0; n_arms],
//             rng: rand::thread_rng(),
//         }
//     }

//     pub fn initialize(&mut self, n_arms: usize) {
//         self.counts = vec![0; n_arms];
//         self.values = vec![0.0; n_arms];
//     }

//     pub fn select_arm(&mut self) -> usize {
//         let n_arms = self.counts.len();
//         let mut samples: Vec<f64> = vec![0.0; n_arms];
//         for arm in 0..n_arms {
//             samples[arm] = self
//                 .rng
//                 .gen::<f64>()
//                 .gamma(self.counts[arm] as f64 + 1.0, 1.0);
//         }
//         samples
//             .iter()
//             .enumerate()
//             .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
//             .unwrap()
//             .0
//     }

//     pub fn update(&mut self, chosen_arm: usize, reward: f64) {
//         self.counts[chosen_arm] += 1;
//         let n = self.counts[chosen_arm];
//         let value = self.values[chosen_arm];
//         self.values[chosen_arm] = ((n - 1) as f64 / n as f64) * value + (1.0 / n as f64) * reward;
//     }
// }
