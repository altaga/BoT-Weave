import { getCookie, setCookie } from "@/actions/cookies";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

function epsilonRound(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export default function MyGaugeChart(props) {
  const [maxValue, setMaxValue] = React.useState(1);
  const [checked, setChecked] = React.useState(true);
  const [key, setKey] = React.useState("");
  const setupCookies = useCallback(async () => {
    getCookie(`${props.id}:key`)
      .then((res) => {
        setKey(res);
      })
      .catch(() => {
        setKey("");
      });
    getCookie(`${props.id}:maxValue`)
      .then((res) => {
        setMaxValue(res);
      })
      .catch(() => {
        setMaxValue(1);
      });
    getCookie(`${props.id}:percent`)
      .then((res) => {
        setChecked(res);
      })
      .catch(() => {
        setChecked(true);
      });
  }, [props.id]);

  useEffect(() => {
    setupCookies();
  }, []);

  const preprocessValue = (value, maxValue = 1) => {
    return epsilonRound(value / maxValue);
  };

  return (
    <Card variant="outlined" sx={{ width: "90%", margin: "20px" }}>
      <Box sx={{ p: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setCookie(`${props.id}:key`, e.target.value);
              setKey(e.target.value);
            }}
            value={key}
            type="text"
            id="outlined-basic"
            label="Key"
            variant="outlined"
          />
          <TextField
            onChange={(e) => {
              if (parseInt(e.target.value) > 0) {
                setCookie(`${props.id}:maxValue`, parseInt(e.target.value));
                setMaxValue(parseInt(e.target.value));
              }
            }}
            value={maxValue.toString()}
            type="number"
            id="outlined-basic"
            label="Max Value"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setCookie(`${props.id}:percent`, e.target.checked);
                  setChecked(e.target.checked);
                }}
                checked={checked}
              />
            }
            label="Percentage"
          />
        </div>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <GaugeChart
          id={props.id}
          textColor="#000"
          formatTextValue={() =>
            checked
              ? `${preprocessValue(props.data?.[key] ?? 0, maxValue) * 100}%`
              : `${preprocessValue(props.data?.[key] ?? 0)}`
          }
          colors={["#5BE12C", "#F5CD19", "#EA4228"]}
          percent={preprocessValue(props.data?.[key] ?? 0, maxValue)}
          arcPadding={0.02}
        />
      </Box>
    </Card>
  );
}
