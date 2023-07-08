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

export const calcAccuracy = (
  allSelectedArms: number[][],
  optArms: number[]
): number[] => {
  const _isOptArms: number[][] = allSelectedArms.map((selectedArms: number[]) =>
    isOptArms(selectedArms, optArms)
  );
  return meanAxis0(_isOptArms);
};

export const getOptArms = (arms: number[], coinNum: number): number[] => {
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

export type AccuracyDict = {
  name: string;
  accuracyList: number[];
};

