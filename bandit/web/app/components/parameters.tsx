import { useState, useEffect, useMemo, useContext } from "react";
import {
  Button,
  TextField,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { AppContext } from "../context";
import { calcAnnealingEpsilonGreedy, calcEpsilonGreedy } from "../simulation";
import {defaultArms, defaultCoinNum, defaultEpsilon, defaultSimNum} from "../const";

enum NumberType {
  INT,
  FLOAT,
}

type NumberInputFormProps = {
  numberType: NumberType;
  initalValue: number;
  maxValue: number;
  minValue: number;
  maxLength: number;
  step: number;
  inputLabel: string;
  value: number; // useStateの値
  setValue: (value: number) => void; // useStateの関数
};

// 1つの整数値入力フォーム
const NumberInputForm: React.FC<NumberInputFormProps> = (props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > props.maxLength) {
      return;
    }

    let num;
    if (props.numberType === NumberType.INT) {
      num = parseInt(e.target.value);
    } else {
      num = parseFloat(e.target.value);
    }
    if (num < props.minValue) {
      if (props.numberType === NumberType.INT) {
        props.setValue(parseInt(props.minValue.toString()));
      } else {
        props.setValue(parseFloat(props.minValue.toString()));
      }
      return;
    } else if (num > props.maxValue) {
      if (props.numberType === NumberType.INT) {
        props.setValue(parseInt(props.maxValue.toString()));
      } else {
        props.setValue(parseFloat(props.maxValue.toString()));
      }
      return;
    } else {
      props.setValue(num);
    }
  };

  if (props.numberType === NumberType.INT) {
    return (
      <TextField
        sx={{ mt: 2 }}
        label={props.inputLabel}
        variant="outlined"
        value={props.value}
        onChange={handleInputChange}
        type="number"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          step: props.step,
        }}
      />
    );
  } else {
    return (
      <TextField
        sx={{ mt: 2 }}
        label={props.inputLabel}
        variant="outlined"
        value={props.value}
        onChange={handleInputChange}
        type="number"
        inputProps={{
          pattern: "^(0(.d+)?|1(.0+)?)$",
          step: props.step,
        }}
      />
    );
  }
};

type NumberArrayInputFormProps = {
  initalValue: number;
  maxValue: number;
  minValue: number;
  maxLength: number;
  step: number;
  inputLabel: string;
  value: number; // 対象の配列要素の値
  values: number[]; // 配列の値
  setValue: (value: number[]) => void; // 配列の値を更新する関数
  arrayIndex: number; // setValueで更新対象とするインデックス
  onClickRemove: () => void;
};

// 複数の数値配列を管理するための入力フォーム
const NumberArrayInputForm: React.FC<NumberArrayInputFormProps> = (props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > props.maxLength) {
      return;
    }
    const num = parseFloat(e.target.value);
    if (num < props.minValue) {
      const value = parseFloat(props.minValue.toString());
      const newValue = props.values.map((v, index) => {
        if (index === props.arrayIndex) {
          return value;
        }
        return v;
      });
      props.setValue(newValue);
    } else if (num > props.maxValue) {
      const value = parseFloat(props.maxValue.toString());
      const newValue = props.values.map((v, index) => {
        if (index === props.arrayIndex) {
          return value;
        }
        return v;
      });
      props.setValue(newValue);
    } else {
      const value = num;
      const newValue = props.values.map((v, index) => {
        if (index === props.arrayIndex) {
          return value;
        }
        return v;
      });
      props.setValue(newValue);
    }
  };

  return (
    <>
      <RemoveCircleIcon
        sx={{ position: "relative", top: "10%", left: "0%" }}
        style={{ fill: "gray" }}
        onClick={props.onClickRemove}
      />
      <TextField
        sx={{ mt: 2 }}
        label={props.inputLabel}
        variant="outlined"
        value={props.value}
        onChange={handleInputChange}
        type="number"
        inputProps={{
          pattern: "^(0(.d+)?|1(.0+)?)$",
          step: props.step,
        }}
      />
    </>
  );
};

type SettingFormsProps = {
  arms: number[];
  setArms: (value: number[]) => void;
  coinNum: number;
  setCoinNum: (value: number) => void;
  simNum: number;
  setSimNum: (value: number) => void;
  epsilon: number;
  setEpsilon: (value: number) => void;
};

const SettingForms: React.FC<SettingFormsProps> = (props) => {
  const xs = Math.floor(12 / props.arms.length);

  const onClickAddArm = () => {
    const newArms = props.arms.concat([0.5]);
    props.setArms(newArms);
  };

  const onClickRemoveArm = (index: number) => () => {
    const newArms = props.arms.filter((_, i) => i !== index);
    props.setArms(newArms);
  };

  return (
    <Container style={{ margin: "20px" }}>
      <p>各腕の報酬確率</p>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Grid container spacing={1}>
            {props.arms.map((arm, index) => (
              <Grid item xs={xs} key={index}>
                <NumberArrayInputForm
                  initalValue={arm}
                  maxValue={1}
                  minValue={0}
                  maxLength={3}
                  step={0.1}
                  inputLabel={`Arm${index + 1}`}
                  value={arm}
                  values={props.arms}
                  setValue={props.setArms}
                  arrayIndex={index}
                  onClickRemove={onClickRemoveArm(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <AddIcon
            sx={{ mt: "50%" }}
            style={{ fill: "gray" }}
            onClick={onClickAddArm}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <NumberInputForm
            numberType={NumberType.INT}
            initalValue={100}
            maxValue={1000}
            minValue={1}
            maxLength={5}
            step={1}
            inputLabel="コインの数"
            value={props.coinNum}
            setValue={props.setCoinNum}
          />
        </Grid>
        <Grid item xs={2}>
          <NumberInputForm
            numberType={NumberType.INT}
            initalValue={100}
            maxValue={1000}
            minValue={1}
            maxLength={5}
            step={1}
            inputLabel="シミュレーション回数"
            value={props.simNum}
            setValue={props.setSimNum}
          />
        </Grid>
        <Grid item xs={2}>
          <NumberInputForm
            numberType={NumberType.FLOAT}
            initalValue={0.1}
            maxValue={1}
            minValue={0}
            maxLength={3}
            step={0.1}
            inputLabel="epsilon"
            value={props.epsilon}
            setValue={props.setEpsilon}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

type ParametersProps = {
  arms: number[];
  setArms: (value: number[]) => void;
  coinNum: number;
  setCoinNum: (value: number) => void;
  simNum: number;
  setSimNum: (value: number) => void;
  setGoSimulate: (value: boolean) => void;
};

const Parameters: React.FC<ParametersProps> = (props) => {
  const [settingArms, setSettingArms] = useState(props.arms);
  const [settingCoinNum, setSettingCoinNum] = useState(100);
  const [settingSimNum, setSettingSimNum] = useState(100);
  const [settingEpsilon, setSettingEpsilon] = useState(1.0);

  const {
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
  } = useContext(AppContext);

  const onSettingDefault = () => {
    // 前回までの値に戻す
    setSettingCoinNum(defaultCoinNum);
    setSettingSimNum(defaultSimNum);
    setSettingArms(defaultArms);
    setSettingEpsilon(defaultEpsilon);
  };

  const onSimulate = () => {
    // 新しい値に更新
    props.setCoinNum(settingCoinNum);
    props.setSimNum(settingSimNum);
    props.setArms(settingArms);
    setEpsilon(settingEpsilon);
    setCalcEpsilonGreedy(calcEpsilonGreedy(settingEpsilon));
    setCalcAnnealingEpsilonGreedy(calcAnnealingEpsilonGreedy(settingEpsilon));

    // シミューレーション開始
    props.setGoSimulate(true);
  };

  return (
    <>
      <Button variant="contained" onClick={onSimulate}>
        Simulate
      </Button>

      <Button variant="outlined" onClick={onSettingDefault}>
        default parameters
      </Button>

      <SettingForms
        arms={settingArms}
        setArms={setSettingArms}
        coinNum={settingCoinNum}
        setCoinNum={setSettingCoinNum}
        simNum={settingSimNum}
        setSimNum={setSettingSimNum}
        epsilon={settingEpsilon}
        setEpsilon={setSettingEpsilon}
      />
    </>
  );
};

export default Parameters;
