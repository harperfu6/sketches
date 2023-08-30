export const meanAxis0 = (arr: number[][]): number[] => {
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

const isOptArms = (
  selectedArms: number[],
  optArms: number[][] // [armCandidates][coinNum]
): number[] => {
  const isOptArms = [];
  for (let i = 0; i < selectedArms.length; i++) {
    if (optArms[i].includes(selectedArms[i])) {
      isOptArms.push(1);
    } else {
      isOptArms.push(0);
    }
  }
  return isOptArms;
};

export const calcAccuracy = (
  allSelectedArms: number[][], // [simNum][coinNum]
  optArms: number[][] // [armCandidates][coinNum]
): number[] => {
  const _isOptArms: number[][] = allSelectedArms.map((selectedArms: number[]) =>
    isOptArms(selectedArms, optArms)
  );
  return meanAxis0(_isOptArms);
};

export const getOptArms = (arms: number[], coinNum: number): number[][] => {
  const argMaxes = (arr: number[]): number[] => {
    let maxIndexes = [0];
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxIndexes = [i];
        maxValue = arr[i];
      } else if (arr[i] === maxValue) {
        maxIndexes.push(i);
      }
    }
    return maxIndexes;
  };
  const _argMaxes = argMaxes(arms);
  return Array(coinNum).fill(_argMaxes);
};

export type AccuracyDict = {
  name: string;
  accuracyList: number[];
};
