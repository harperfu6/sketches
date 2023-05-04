import init, { EpsilonGreedy, Random } from "./pkg/bandit";
import { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import "./App.css";

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

type AccuracyDict = {
  name: string;
  accuracyList: number[];
};

type Agent = {
  free: () => void;
  reset: (agent: Agent, n: number) => void;
  select_arm: (agent: Agent) => number;
  update: (agent: Agent, chosen_arm: number, reward: number) => void;
};

const simulation = async (
  agent: Agent,
  arms: number[],
  sim_num: number,
  coin_num: number
) => {
  if (agent) {
    const agentName = agent.constructor.name;
    let IAgent;
    if (agentName === "Random") {
      IAgent = Random;
    } else if (agentName === "EpsilonGreedy") {
      IAgent = EpsilonGreedy;
    } else {
      throw new Error("invalid agent name");
    }

    const allRewards = [];
    const allSelectedArms = [];
    for (let i = 0; i < sim_num; i++) {
      IAgent.reset(agent, arms.length);
      const rewards = [];
      const selected_arms = [];
      for (let j = 0; j < coin_num; j++) {
        const arm = IAgent.select_arm(agent);
        let reward;
        if (Math.random() < arms[arm]) {
          reward = 1;
        } else {
          reward = 0;
        }
        IAgent.update(agent, arm, reward);

        rewards.push(reward);
        selected_arms.push(arm);
      }
      allRewards.push(rewards);
      allSelectedArms.push(selected_arms);
    }

    const accuracyList = calcAccuracy(
      allSelectedArms,
      getOptArms(arms, coin_num)
    );

    return accuracyList;
  } else {
    return [];
  }
};

const simluationAll = async (
  simlationList: Agent[],
  isSimulation: boolean,
  arms: number[],
  simNum: number,
  coinNum: number
) => {
  const _results = await Promise.all(
    simlationList.map((agent) => simulation(agent, arms, simNum, coinNum))
  );
  const results: AccuracyDict[] = [
    {
      name: "random",
      accuracyList: _results[0],
    },
    {
      name: "epsilonGreedy",
      accuracyList: _results[1],
    },
  ];
  return results;
};

const makeData = (accracyDict: AccuracyDict) => {
  const accuracyList = accracyDict.accuracyList;
  const data = {
    labels: accuracyList.map((_, i) => i),
    datasets: [
      {
        label: accracyDict.name,
        data: accuracyList,
        fill: false,
        backgroundcolor: "rgb(255, 99, 132)",
        bordercolor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  return data;
};

const App = () => {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [random, setRandom] = useState<Random>();
  const [epsilonGreedy, setEpsilonGreedy] = useState<EpsilonGreedy>();

  const [isSimulation, setIsSimulation] = useState(false);
  const [accracyDictList, setAccuracyDictList] = useState<AccuracyDict[]>([]);

  const arms = [0.1, 0.1, 0.2, 0.3];
  const epsilon = 0.1;

  const coinNum = 100;
  const simNum = 100;

  useEffect(() => {
    init()
      .then(() => setLoadWasmFlg(true))
      .then(() => setEpsilonGreedy(EpsilonGreedy.new(epsilon, arms.length)))
      .then(() => setRandom(Random.new(arms.length)))
      .then(() => setIsSimulation(true));
  });

  useEffect(() => {
    const sim = async () => {
      const results = await simluationAll(
        [random, epsilonGreedy],
        isSimulation,
        arms,
        simNum,
        coinNum
      );
      setAccuracyDictList(results);
    };
    sim();
  }, [isSimulation]);

  if (!loadWasm) return <div>loading wasm...</div>;
  if (epsilonGreedy === undefined || random === undefined)
    return <div>loading Agents...</div>;

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

  return (
    <>
      <div style={{ width: "600px", height: "600px" }}>
        {accracyDictList.map((accracyDict: AccuracyDict) => (
          <Line
            key={accracyDict.name}
            data={makeData(accracyDict)}
            options={options}
          />
        ))}
      </div>
    </>
  );
};

export default App;
