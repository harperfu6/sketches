import init, {
  AnnealingEpsilonGreedy,
  AnnealingSoftmax,
  EpsilonGreedy,
  Random,
  Softmax,
} from "./pkg/bandit";
import { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import { calcAccuracy, getOptArms, AccuracyDict } from "./utils";
import "./App.css";

{
  /* type Agent = Random | EpsilonGreedy | AnnealingEpsilonGreedy | Softmax | AnnealingSoftmax | undefined; */
}
type Agent = EpsilonGreedy | undefined;

const simulation = async (
  agent: Agent,
  arms: number[],
  sim_num: number,
  coin_num: number
) => {
  if (agent) {
    const allRewards = [];
    const allSelectedArms = [];
    for (let i = 0; i < sim_num; i++) {
      agent.call_reset(arms.length);
      const rewards = [];
      const selected_arms = [];
      for (let j = 0; j < coin_num; j++) {
        const arm = agent.call_select_arm();
        let reward;
        if (Math.random() < arms[arm]) {
          reward = 1;
        } else {
          reward = 0;
        }
        agent.call_update(arm, reward);

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
  arms: number[],
  simNum: number,
  coinNum: number
) => {
  const _results = await Promise.all(
    simlationList.map((agent) => simulation(agent, arms, simNum, coinNum))
  );
  const results: AccuracyDict[] = [
    {
      name: "epsilonGreedy",
      accuracyList: _results[0],
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
  const [annealingEpsilonGreedy, setAnnealingEpsilonGreedy] =
    useState<AnnealingEpsilonGreedy>();
  const [softmax, setSoftmax] = useState<Softmax>();
  const [annealingSoftmax, setAnnealingSoftmax] = useState<AnnealingSoftmax>();

  const [isSimulation, setIsSimulation] = useState(false);
  const [accracyDictList, setAccuracyDictList] = useState<AccuracyDict[]>([]);

  const arms = [0.1, 0.1, 0.2, 0.3];
  const epsilon = 0.1;

  const coinNum = 1000;
  const simNum = 1000;

  useEffect(() => {
    init()
      .then(() => setLoadWasmFlg(true))
      .then(() => setRandom(Random.new(arms.length)))
      .then(() => setEpsilonGreedy(EpsilonGreedy.new(epsilon, arms.length)))
      .then(() =>
        setAnnealingEpsilonGreedy(AnnealingEpsilonGreedy.new(arms.length))
      )
      .then(() => setSoftmax(Softmax.new(arms.length)))
      .then(() => setAnnealingSoftmax(AnnealingSoftmax.new(arms.length)))
      .then(() => setIsSimulation(true));
  });

  useEffect(() => {
    const sim = async () => {
      const results = await simluationAll(
        [epsilonGreedy],
        arms,
        simNum,
        coinNum
      );
      setAccuracyDictList(results);
    };
    sim();
  }, [isSimulation]);

  if (!loadWasm) return <div>loading wasm...</div>;
  if (
    epsilonGreedy === undefined ||
    random === undefined ||
    annealingEpsilonGreedy === undefined ||
    softmax === undefined ||
    annealingSoftmax === undefined
  )
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
