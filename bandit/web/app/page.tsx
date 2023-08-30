"use client";

import init from "@/pkg/bandit";
import {
  calcAnnealingEpsilonGreedy,
  calcAnnealingSoftmax,
  calcEpsilonGreedy,
  calcRandom,
  calcSoftmax,
} from "./simulation/";
import {
  useState,
  useEffect,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import { AccuracyDict } from "./utils";
import Parameters from "./components/parameters";
import { Grid } from "@mui/material";
import {AppContext} from "./context";
import {defaultArms, defaultCoinNum, defaultEpsilon, defaultSimNum} from "./const";

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

  const [arms, setArms] = useState(defaultArms);
  const [coinNum, setCoinNum] = useState(defaultCoinNum);
  const [simNum, setSimNum] = useState(defaultSimNum);
  const [epsilon, setEpsilon] = useState(defaultEpsilon);

  const [_calcRandom, setCalcRandom] = useState(calcRandom);
  const [_calcEpsilonGreedy, setCalcEpsilonGreedy] = useState(
    calcEpsilonGreedy(epsilon)
  );
  const [_calcAnnealingEpsilonGreedy, setCalcAnnealingEpsilonGreedy] = useState(
    calcAnnealingEpsilonGreedy(epsilon)
  );
  const [_calcSoftmax, setCalcSoftmax] = useState(calcSoftmax);
  const [_calcAnnealingSoftmax, setCalcAnnealingSoftmax] =
    useState(calcAnnealingSoftmax);

  useEffect(() => {
    init().then(() => setLoadWasmFlg(true));
  }, []);

  useEffect(() => {
    const sim = async () => {
      console.log(epsilon);
      const _results = await Promise.all([
        _calcRandom(arms, coinNum, simNum),
        _calcEpsilonGreedy(arms, coinNum, simNum),
        _calcAnnealingEpsilonGreedy(arms, coinNum, simNum),
        _calcSoftmax(arms, coinNum, simNum),
        _calcAnnealingSoftmax(arms, coinNum, simNum),
      ]);

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
  }, [
    loadWasm,
    goSimulate,
    epsilon,
    _calcRandom,
    _calcEpsilonGreedy,
    _calcAnnealingEpsilonGreedy,
    _calcSoftmax,
    _calcAnnealingSoftmax,
    arms,
    coinNum,
    simNum,
  ]);

  if (!loadWasm) return <div>loading wasm...</div>;
  if (accracyDictList.length < 5)
    // model num
    return <div>loading Agents...</div>;

  return (
    <>
      <AppContext.Provider
        value={{
          epsilon,
          setEpsilon,
          _calcRandom,
          setCalcRandom,
          _calcEpsilonGreedy,
          setCalcEpsilonGreedy,
          _calcAnnealingEpsilonGreedy,
          setCalcAnnealingEpsilonGreedy,
          _calcSoftmax,
          setCalcSoftmax,
          _calcAnnealingSoftmax,
          setCalcAnnealingSoftmax,
        }}
      >
        <Parameters
          arms={arms}
          setArms={setArms}
          coinNum={coinNum}
          setCoinNum={setCoinNum}
          simNum={simNum}
          setSimNum={setSimNum}
          setGoSimulate={setGoSimulate}
        />
        <Grid container spacing={3} style={{ margin: "10px" }}>
          {accracyDictList.map((accracyDict: AccuracyDict) => {
            return (
              <Grid item xs={5} key={accracyDict.name}>
                <Line
                  key={accracyDict.name}
                  data={makeData(accracyDict)}
                  options={options}
                />
              </Grid>
            );
          })}
        </Grid>
      </AppContext.Provider>
    </>
  );
};

export default App;
