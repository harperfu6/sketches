// use rand::prelude::*;

// pub struct UCB1 {
//     arms: Vec<f64>,
// }

// impl UCB1 {
//     pub fn new(arms: Vec<f64>) -> Self {
//         Self { arms }
//     }

//     pub fn select_arm(&self) -> usize {
//         let n_arms = self.counts.len();
//         let total_counts: usize = self.counts.iter().sum();
//         let mut ucb_values: Vec<f64> = vec![0.0; n_arms];
//         for arm in 0..n_arms {
//             let bonus = (2.0 * (total_counts as f64).ln() / (self.counts[arm] as f64)).sqrt();
//             ucb_values[arm] = self.values[arm] + bonus;
//         }
//         ucb_values
//             .iter()
//             .enumerate()
//             .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
//             .unwrap()
//             .0
//     }

// }
