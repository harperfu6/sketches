mod agent;
mod epsilon_greedy;
mod random;
mod softmax;
mod thompson;
mod ucb1;

use crate::agent::Agent;
use rand::prelude::*;

fn arg_max(v: &Vec<f64>) -> usize {
    v.iter()
        .enumerate()
        .max_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
        .unwrap()
        .0
}

fn get_opt_arms(arms: &Vec<f64>, coin_num: usize) -> Vec<usize> {
    let arg_max = arg_max(arms);
    vec![arg_max; coin_num]
}

fn is_opt_arms(selected_arms: &Vec<usize>, opt_arms: &Vec<usize>) -> Vec<usize> {
    selected_arms
        .iter()
        .zip(opt_arms.iter())
        .map(|(a, b)| if a == b { 1 } else { 0 })
        .collect()
}

fn mean_axis_0(v: &Vec<Vec<usize>>) -> Vec<f64> {
    let mut mean = vec![0.; v[0].len()];
    for c in 0..v[0].len() {
        for r in 0..v.len() {
            mean[c] += v[r][c] as f64;
        }
    }
    for c in 0..v[0].len() {
        mean[c] /= v.len() as f64;
    }

    mean
}

pub fn simlation(
    agent: &mut dyn Agent,
    arms: &Vec<f64>,
    sim_num: usize,
    coin_num: usize,
) -> (Vec<Vec<f64>>, Vec<Vec<usize>>) {
    let mut all_rewards = vec![];
    let mut all_selected_arms = vec![];
    let mut rng = rand::thread_rng();
    for _ in 0..sim_num {
        agent.reset(arms.len());
        let mut rewards = vec![];
        let mut selected_arms = vec![];
        for _ in 0..coin_num {
            let chosen_arm = agent.select_arm();
            let reward = if rng.gen::<f64>() < arms[chosen_arm] {
                1.0
            } else {
                0.0
            };
            agent.update(chosen_arm, reward);

            rewards.push(reward);
            selected_arms.push(chosen_arm);
        }
        all_rewards.push(rewards);
        all_selected_arms.push(selected_arms);
    }
    (all_rewards, all_selected_arms)
}

fn calc_accuracy(all_selected_arms: &Vec<Vec<usize>>, opt_arms: &Vec<usize>) -> Vec<f64> {
    let is_opt_arms = all_selected_arms
        .iter()
        .map(|selected_arms| is_opt_arms(selected_arms, opt_arms))
        .collect::<Vec<Vec<usize>>>();

    mean_axis_0(&is_opt_arms)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::epsilon_greedy::EpsilonGreedy;
    use crate::random::Random;

    use lazy_static::lazy_static;

    lazy_static! {
        static ref ARMS: Vec<f64> = vec![0.1, 0.1, 0.2, 0.3];
        static ref COIN_NUM: usize = 1000;
        static ref SIM_NUM: usize = 1000;
        static ref OPT_ARMS: Vec<usize> = get_opt_arms(&ARMS, *COIN_NUM);
    }

    #[test]
    fn test_random() {
        let mut random = Random::new(ARMS.len());
        let (all_rewards, all_selected_arms) = simlation(&mut random, &ARMS, *SIM_NUM, *COIN_NUM);
        let accuracy_list = calc_accuracy(&all_selected_arms, &OPT_ARMS);
        println!("accuracy_list: {:?}", accuracy_list);
    }

    #[test]
    fn test_egreedy() {
        let epsilon = 0.1;
        let mut egreedy = EpsilonGreedy::new(epsilon, ARMS.len());
        let (all_rewards, all_selected_arms) = simlation(&mut egreedy, &ARMS, *SIM_NUM, *COIN_NUM);
        let accuracy_list = calc_accuracy(&all_selected_arms, &OPT_ARMS);
        println!("accuracy_list: {:?}", accuracy_list);
    }
}
