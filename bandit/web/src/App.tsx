import init, { EpsilonGreedy } from "./pkg/bandit";
import { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import "./App.css";

const simulation = (
  agent: EpsilonGreedy,
  arms: number[],
  sim_num: number,
  coin_num: number,
  setFinishSimulation: (finishSimulation: boolean) => void
) => {
  const allRewards = [];
  const allSelectedArms = [];
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
    allRewards.push(rewards);
    allSelectedArms.push(selected_arms);
  }
  setFinishSimulation(true);

  return { allRewards, allSelectedArms };
};

const meanAxis0 = (arr: number[][]): number[] => {
  const meanArr: number[] = [];
  for (let c = 0; c < arr[0].length; c++) {
    meanArr[c] = 0;
    for (let r = 0; r < arr.length; r++) {
      meanArr[c] += arr[r][c];
    }
  }
  for (let r = 0; r < meanArr.length; r++) {
    meanArr[r] /= arr.length;
  }
  return meanArr;
};

const isOptArms = (selectedArms: number[], optArms: number[]): number[] => {
  const isOptArms = [];
  for (let i = 0; i < selectedArms.length; i++) {
    if (selectedArms[i] === optArms[i]) {
      isOptArms.push(1);
    } else {
      isOptArms.push(0);
    }
  }
  return isOptArms;
};

const calcAccuracy = (
  allSelectedArms: number[][],
  optArms: number[]
): number[] => {
  const _isOptArms: number[][] = allSelectedArms.map((selectedArms: number[]) =>
    isOptArms(selectedArms, optArms)
  );
  return meanAxis0(_isOptArms);
};

const getOptArms = (arms: number[], coinNum: number): number[] => {
  const argMax = (arr: number[]): number => {
    let maxIndex = 0;
    let maxValue = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxIndex = i;
        maxValue = arr[i];
      }
    }
    return maxIndex;
  };
  const _argMax = argMax(arms);
  return Array(coinNum).fill(_argMax);
};

type rewardsDict = {
  agent: string;
  allRewards: number[][];
};

const updateRewardsDictList = (
  rewardsDictList: rewardsDict[],
  agent: string,
  allRewards: number[][]
) => {
  const newRewardsDictList = rewardsDictList.map((rewardsDict) => {
    if (rewardsDict.agent === agent) {
      return { agent: agent, allRewards: allRewards };
    } else {
      return rewardsDict;
    }
  });
  return newRewardsDictList;
};

const App = () => {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [finishSimulation, setFinishSimulation] = useState(false);
  const [epsilonGreedy, setEpsilonGreedy] = useState<EpsilonGreedy>();

  const [rewardsDictList, setRewardsDictList] = useState<rewardsDict[]>([]);
  const [accracyList, setAccuracyList] = useState<number[]>([]);

  const arms = [0.1, 0.1, 0.2, 0.3];
  const epsilon = 0.1;

  const coinNum = 100;
  const simNum = 100;

  useEffect(() => {
    init()
      .then(() => setLoadWasmFlg(true))
      .then(() => setEpsilonGreedy(EpsilonGreedy.new(epsilon, arms.length)));
  });

  if (!loadWasm) return <div>loading wasm...</div>;
  if (epsilonGreedy === undefined) return <div>loading EpsilonGreedy...</div>;

  if (!finishSimulation) {
    const { allRewards, allSelectedArms } = simulation(
      epsilonGreedy,
      arms,
      simNum,
      coinNum,
      setFinishSimulation
    );

    setAccuracyList(calcAccuracy(allSelectedArms, getOptArms(arms, coinNum)));
  }
  const data = {
    labels: accracyList.map((_, i) => i),
    datasets: [
      {
        label: "epsilongreedy",
        data: accracyList,
        fill: false,
        backgroundcolor: "rgb(255, 99, 132)",
        bordercolor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 1.0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "accuracy",
      },
    },
  };

  if (accracyList.length === 0) return <div>calclating EpsilonGreedy...</div>;

  return (
    <>
      <div style={{width:"600px", height:"600px"}}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default App;
