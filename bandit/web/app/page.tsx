"use client";

import init from "@/pkg/bandit";
import {
  calcAnnealingEpsilonGreedy,
  calcAnnealingSoftmax,
  calcEpsilonGreedy,
  calcRandom,
  calcSoftmax,
} from "./simulation/";
import { useState, useEffect, useMemo } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import { AccuracyDict } from "./utils";
import Parameters from "./components/parameters";
import { Grid } from "@mui/material";

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

const App = () => {
  const [loadWasm, setLoadWasmFlg] = useState(false);
  const [accracyDictList, setAccuracyDictList] = useState<AccuracyDict[]>([]);
  const [goSimulate, setGoSimulate] = useState(true);

  const calcList = useMemo(
    () => [
      calcRandom,
      calcEpsilonGreedy,
      calcAnnealingEpsilonGreedy,
      calcSoftmax,
      calcAnnealingSoftmax,
    ],
    []
  );
  const [arms, setArms] = useState([0.1, 0.1, 0.2, 0.3]);
  // const [arms, setArms] = useState([1, 1, 1, 1]);
  const [coinNum, setCoinNum] = useState(100);
  const [simNum, setSimNum] = useState(100);

  useEffect(() => {
    init().then(() => setLoadWasmFlg(true));
  }, []);

  useEffect(() => {
    const sim = async () => {
      const _results = await Promise.all(
        calcList.map((calc) => calc(arms, coinNum, simNum))
      );

      const accuracyDictList = [
        {
          name: "Random",
          accuracyList: _results[0],
        },
        {
          name: "EpsilonGreedy",
          accuracyList: _results[1],
        },
        {
          name: "AnnealingEpsilonGreedy",
          accuracyList: _results[2],
        },
        {
          name: "Softmax",
          accuracyList: _results[3],
        },
        {
          name: "AnnealingSoftmax",
          accuracyList: _results[4],
        },
      ];
      setAccuracyDictList(accuracyDictList);
    };
    if (loadWasm && goSimulate) {
      sim();
      setGoSimulate(false);
    }
  }, [loadWasm, goSimulate, calcList, arms, coinNum, simNum]);

  if (!loadWasm) return <div>loading wasm...</div>;
  if (accracyDictList.length < calcList.length)
    return <div>loading Agents...</div>;

  return (
    <>
      <Parameters
        arms={arms}
        setArms={setArms}
        coinNum={coinNum}
        setCoinNum={setCoinNum}
        simNum={simNum}
        setSimNum={setSimNum}
        setGoSimulate={setGoSimulate}
      />
      <Grid container spacing={3} style={{margin: '10px'}}>
        {accracyDictList.map((accracyDict: AccuracyDict) => (
          <Grid item xs={5} key={accracyDict.name}>
            <Line
              key={accracyDict.name}
              data={makeData(accracyDict)}
              options={options}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default App;
