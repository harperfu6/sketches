pub trait Agent {
    fn reset(&mut self, n_arms: usize);
    fn select_arm(&self) -> usize;
    fn update(&mut self, chosen_arm: usize, reward: f64);
}
