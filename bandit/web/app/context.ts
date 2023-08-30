import {createContext, Dispatch, SetStateAction} from "react";

type ModelSig = (
  arms: number[],
  coinNum: number,
  simNum: number
) => Promise<number[]>;

export const AppContext = createContext(
  {} as {
    epsilon: number;
    setEpsilon: Dispatch<SetStateAction<number>>;
    _calcRandom: ModelSig;
    setCalcRandom: Dispatch<SetStateAction<ModelSig>>;
    _calcEpsilonGreedy: ModelSig;
    setCalcEpsilonGreedy: Dispatch<SetStateAction<ModelSig>>;
    _calcAnnealingEpsilonGreedy: ModelSig;
    setCalcAnnealingEpsilonGreedy: Dispatch<SetStateAction<ModelSig>>;
    _calcSoftmax: ModelSig;
    setCalcSoftmax: Dispatch<SetStateAction<ModelSig>>;
    _calcAnnealingSoftmax: ModelSig;
    setCalcAnnealingSoftmax: Dispatch<SetStateAction<ModelSig>>;
  }
);
