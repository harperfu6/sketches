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

type SettingFormsProps = {
  coinNum: number;
  setCoinNum: (value: number) => void;
  simNum: number;
  setSimNum: (value: number) => void;
};

const SettingForms: React.FC<SettingFormsProps> = (props) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
  coinNum: number;
  setCoinNum: (value: number) => void;
  simNum: number;
  setSimNum: (value: number) => void;
  setGoSimulate: (value: boolean) => void;
};

const Parameters: React.FC<ParametersProps> = (props) => {
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
  };

  const onSettingSubmit = () => {
    setOpen(false);
    // 新しい値に更新
    props.setCoinNum(settingCoinNum);
    props.setSimNum(settingSimNum);
  };

  const onSimulate = () => {
    props.setGoSimulate(true);
  };

  return (
    <>
      <p>コインの数: {props.coinNum}</p>
      <p>シミュレーション回数: {props.simNum}</p>
      <Button variant="outlined" onClick={onSettingOpen}>
        Change Setting
      </Button>
      <Button variant="outlined" onClick={onSimulate}>
        Go Simulate
      </Button>
      <Dialog open={open}>
        <DialogTitle>SETTING</DialogTitle>
        <DialogContent>
          <SettingForms
            coinNum={settingCoinNum}
            setCoinNum={setSettingCoinNum}
            simNum={settingSimNum}
            setSimNum={setSettingSimNum}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSettingCancel}>Cancel</Button>
          <Button onClick={onSettingSubmit}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Parameters;
