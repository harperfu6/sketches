import init, { EpsilonGreedy } from "./pkg/bandit";
import { useState, useEffect } from "react";
import "./App.css";

const simulation = (
  agent: EpsilonGreedy,
  arms: number[],
  sim_num: number,
  coin_num: number,
  setFinishSimulation: (finishSimulation: boolean) => void
) => {
  const all_rewards = [];
  const all_selected_arms = [];
  for (let i = 0; i < sim_num; i++) {
    EpsilonGreedy.reset(agent, arms.length);
    const rewards = [];
    const selected_arms = [];
    for (let j = 0; j < coin_num; j++) {
      const arm = EpsilonGreedy.select_arm(agent);
      let reward;
      if (Math.random() < arms[arm]) {
        reward = 1;
      } else {
        reward = 0;
      }
      EpsilonGreedy.update(agent, arm, reward);

      rewards.push(reward);
      selected_arms.push(arm);
    }
    all_rewards.push(rewards);
    all_selected_arms.push(selected_arms);
  }
  setFinishSimulation(true);

  return { all_rewards, all_selected_arms };
};

const App = () => {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [epsilonGreedy, setEpsilonGreedy] = useState<EpsilonGreedy>();
  const [finishSimulation, setFinishSimulation] = useState(false);

  const arms = [0.1, 0.1, 0.2, 0.3];
  const epsilon = 0.1;

  useEffect(() => {
    init()
      .then(() => setLoadWasmFlg(true))
      .then(() => setEpsilonGreedy(EpsilonGreedy.new(epsilon, arms.length)));
  });

  if (!loadWasm) return <div>loading wasm...</div>;
  if (epsilonGreedy === undefined) return <div>loading EpsilonGreedy...</div>;

  if (!finishSimulation) {
    const { all_rewards, all_selected_arms } = simulation(
      epsilonGreedy,
      arms,
      10,
      10,
      setFinishSimulation
    );
    console.log(all_selected_arms);
  }

  return <></>;
};

export default App;
