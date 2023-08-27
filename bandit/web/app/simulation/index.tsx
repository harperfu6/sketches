import {
  AnnealingEpsilonGreedy,
  AnnealingSoftmax,
  EpsilonGreedy,
  Random,
  Softmax,
} from "@/pkg/bandit";
import { calcAccuracy, getOptArms, AccuracyDict } from "@/app/utils";

export const calcRandom = () => async (
  arms: number[],
  coinNum: number,
  simNum: number
) => {
  const random = Random.new(arms.length);
  const accuracyList = await simulation(random, arms, simNum, coinNum);
  return accuracyList;
};

export const calcEpsilonGreedy = (epsilon: number) => () => async (
  arms: number[],
  coinNum: number,
  simNum: number
) => {
  const epsilonGreedy = EpsilonGreedy.new(epsilon, arms.length);
  const accuracyList = await simulation(epsilonGreedy, arms, simNum, coinNum);
  return accuracyList;
};

export const calcAnnealingEpsilonGreedy = (epsilon: number) => () => async (
  arms: number[],
  coinNum: number,
  simNum: number
) => {
  const annealingEpsilonGreedy = AnnealingEpsilonGreedy.new(epsilon, arms.length);
  const accuracyList = await simulation(
    annealingEpsilonGreedy,
    arms,
    simNum,
    coinNum
  );
  return accuracyList;
};

export const calcSoftmax = () => async (
  arms: number[],
  coinNum: number,
  simNum: number
) => {
  const softmax = Softmax.new(arms.length);
  const accuracyList = await simulation(softmax, arms, simNum, coinNum);
  return accuracyList;
};

export const calcAnnealingSoftmax = () => async (
  arms: number[],
  coinNum: number,
  simNum: number
) => {
  const annealingSoftmax = AnnealingSoftmax.new(arms.length);
  const accuracyList = await simulation(
    annealingSoftmax,
    arms,
    simNum,
    coinNum
  );
  return accuracyList;
};

export type Agent =
  | Random
  | EpsilonGreedy
  | AnnealingEpsilonGreedy
  | Softmax
  | AnnealingSoftmax
  | undefined;

const simulation = async (
  agent: Agent,
  arms: number[],
  sim_num: number,
  coin_num: number
): Promise<number[]> => {
  console.log(agent);
  if (agent) {
    try {
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
    } catch (e) {
      console.error(e);
      return [];
    }
  } else {
    return [];
  }
};
