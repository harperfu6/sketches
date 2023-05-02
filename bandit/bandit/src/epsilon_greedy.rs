use rand::prelude::*;

pub struct EpsilonGreedy {
    epsilon: f64,
    values: Vec<f64>,
    counts: Vec<usize>,
}

impl EpsilonGreedy {
    pub fn new(epsilon: f64, n_arms: usize) -> Self {
        Self {
            epsilon,
            values: vec![0.; n_arms],
            counts: vec![0; n_arms],
        }
    }

    /// Select arm with the largest estimated value with probability 1 - epsilon,
    pub fn select_arm(&self) -> usize {
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

    pub fn update(&mut self, chosen_arm: usize, reward: f64) {
        self.counts[chosen_arm] += 1;
        let n = self.counts[chosen_arm];
        let value = self.values[chosen_arm];
        self.values[chosen_arm] = ((n - 1) as f64 / n as f64) * value + (1.0 / n as f64) * reward;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_egreedy() {
        let arms = vec![0.1, 0.1, 0.2, 0.3];
        // let arms = vec![0.3, 0.1, 0.2, 0.1];
        let coin_num = 1000;
        let sim_num = 1000;

        let mut all_rewards = vec![];
        let mut all_selected_arms = vec![];
        let mut rng = rand::thread_rng();
        for _ in 0..sim_num {
            let mut egreedy = EpsilonGreedy::new(0.1, arms.len());
            let mut rewards = vec![];
            let mut selected_arms = vec![];
            for _ in 0..coin_num {
                let chosen_arm = egreedy.select_arm();
                let reward = if rng.gen::<f64>() < arms[chosen_arm] {
                    1.0
                } else {
                    0.0
                };
                egreedy.update(chosen_arm, reward);

                rewards.push(reward);
                selected_arms.push(chosen_arm);
            }
            all_rewards.push(rewards);
            all_selected_arms.push(selected_arms);
        }

        let opt_arm = arms
            .iter()
            .enumerate()
            .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
            .unwrap()
            .0;
        let opt_arms = vec![opt_arm; coin_num];

        fn is_opt_arm(selected_arms: &Vec<usize>, opt_arms: &Vec<usize>) -> Vec<usize> {
            selected_arms
                .iter()
                .zip(opt_arms.iter())
                .map(|(a, b)| if a == b { 1 } else { 0 })
                .collect()
        }
        let is_opt_arms = all_selected_arms
            .iter()
            .map(|selected_arms| is_opt_arm(selected_arms, &opt_arms))
            .collect::<Vec<Vec<usize>>>();

        fn mean_axis_0(v: &Vec<Vec<usize>>) -> Vec<f64> {
            let mut mean = vec![0.; v[0].len()];
            for i in 0..v.len() {
                for j in 0..v[0].len() {
                    mean[j] += v[i][j] as f64;
                }
            }
            for i in 0..mean.len() {
                mean[i] /= v.len() as f64;
            }
            mean
        }

        let mean_of_is_opt_arms = mean_axis_0(&is_opt_arms);
        println!("mean of is_opt_arms: {:?}", mean_of_is_opt_arms);
    }
}
