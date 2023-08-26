import { useState, useEffect, useMemo } from "react";
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

type NumberInputFormProps = {
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
    const num = parseInt(e.target.value);
    if (num < props.minValue) {
      props.setValue(parseInt(props.minValue.toString()));
      return;
    } else if (num > props.maxValue) {
      props.setValue(parseInt(props.maxValue.toString()));
      return;
    } else {
      props.setValue(num);
    }
  };

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
};

type SettingFormsProps = {
  arms: number[];
  setArms: (value: number[]) => void;
  coinNum: number;
  setCoinNum: (value: number) => void;
  simNum: number;
  setSimNum: (value: number) => void;
};

const SettingForms: React.FC<SettingFormsProps> = (props) => {
  const xs = Math.floor(12 / props.arms.length);

  return (
    <Container style={{ marginLeft: 0 }}>
      <p>各腕の報酬確率</p>
      <Grid container spacing={2}>
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
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <NumberInputForm
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
        <Grid item xs={3}>
          <NumberInputForm
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
  // const defaultArms = [0.1, 0.1, 0.2, 0.3];
  const [settingArms, setSettingArms] = useState(props.arms);
  const [settingCoinNum, setSettingCoinNum] = useState(100);
  const [settingSimNum, setSettingSimNum] = useState(100);

  const [open, setOpen] = useState(false);

  const onSettingOpen = () => {
    setOpen(true);
  };

  const onSettingCancel = () => {
    setOpen(false);
    // 前回までの値に戻す
    setSettingCoinNum(props.coinNum);
    setSettingSimNum(props.simNum);
    setSettingArms(props.arms);
  };

  const onSettingSubmit = () => {
    setOpen(false);
    // 新しい値に更新
    props.setCoinNum(settingCoinNum);
    props.setSimNum(settingSimNum);
    props.setArms(settingArms);
  };

  const onSimulate = () => {
    // 新しい値に更新
    props.setCoinNum(settingCoinNum);
    props.setSimNum(settingSimNum);
    props.setArms(settingArms);

    // シミューレーション開始
    props.setGoSimulate(true);
  };

  return (
    <>
      <Button variant="outlined" onClick={onSimulate}>
        Go Simulate
      </Button>

      <SettingForms
        arms={settingArms}
        setArms={setSettingArms}
        coinNum={settingCoinNum}
        setCoinNum={setSettingCoinNum}
        simNum={settingSimNum}
        setSimNum={setSettingSimNum}
      />
    </>
  );
};

export default Parameters;

// type ROParameterFieldProps = {
//   arms: number[];
//   coinNum: number;
//   simNum: number;
// };
//
// const ROParameterField: React.FC<ROParameterFieldProps> = (props) => {
//   return (
//     <Container sx={{ mt: 2 }}>
//       <Grid container spacing={2}>
//         {props.arms.map((arm, index) => (
//           <Grid item xs={3} key={index}>
//             <TextField
//               id="outlined-read-only-input"
//               label={`Arm${index + 1}`}
//               defaultValue={arm}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//           </Grid>
//         ))}
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={3}>
//           <TextField
//             id="outlined-read-only-input"
//             label={"コインの数"}
//             defaultValue={props.coinNum}
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <TextField
//             id="outlined-read-only-input"
//             label={"シミュレーション回数"}
//             defaultValue={props.simNum}
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

//      <Button variant="outlined" onClick={onSettingOpen}>
//        Change Setting
//      </Button>

//       <Dialog open={open}>
//         <DialogTitle>SETTING</DialogTitle>
//         <DialogContent>
//           <SettingForms
//             arms={settingArms}
//             setArms={setSettingArms}
//             coinNum={settingCoinNum}
//             setCoinNum={setSettingCoinNum}
//             simNum={settingSimNum}
//             setSimNum={setSettingSimNum}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onSettingCancel}>Cancel</Button>
//           <Button onClick={onSettingSubmit}>Change</Button>
//         </DialogActions>
//       </Dialog>
