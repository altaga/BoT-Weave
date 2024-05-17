import { getCookie } from "@/actions/cookies";
import { emulateDevice } from "@/actions/emulateDevice";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { toast } from "react-toastify";

const baseDataIn = `{
  "key1": "value1",
  "key2": 0,
  "key3": 0.1,
  "key4": true
}`;

export default function Emulator() {
  // States
  const [apikey, setApiKey] = React.useState(null);
  const [dataIn, setDataIn] = React.useState(baseDataIn);
  const [sensor, setSensor] = React.useState("");
  const [privateFlag, setPrivateFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // Hooks

  const getApiKeys = async () => {
    getCookie("apikey")
      .then((res) => {
        setApiKey(res);
      })
      .catch(() => {
        console.log("No API key found");
      });
  };

  const transactionToast = (txhash, sensor) => {
    // Notification can be a component, a string or a plain object
    toast(
      <div>
        {sensor} Data Sent Successfully!
        <br />
        <Link
          href={`https://greenfieldscan.com/tx/${txhash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {txhash}
        </Link>
      </div>,
      { position: "bottom-left" }
    );
  };

  useEffect(() => {
    getApiKeys();
  }, []);

  return (
    <Fragment>
      {apikey === null ? (
        <h1>Create an API Key first</h1>
      ) : (
        <Card variant="outlined" sx={{ width: "60%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              padding: "0px",
            }}
          >
            <h1>Emulate Device</h1>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              gap: "10px",
              padding: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setSensor(e.target.value);
              }}
              value={sensor}
              type="text"
              id="outlined-basic"
              label="Sensor Tag"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setPrivateFlag(e.target.checked);
                  }}
                  checked={privateFlag}
                />
              }
              label="Private Data"
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                setDataIn(e.target.value);
              }}
              value={dataIn}
              multiline
              id="outlined-basic"
              label="Data In"
              variant="outlined"
              rows={6}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "20px",
            }}
          >
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              style={{ fontWeight: "bold", padding: "20px" }}
              onClick={async () => {
                try {
                  setLoading(true);
                  let txhash = await emulateDevice(
                    apikey,
                    JSON.parse(dataIn),
                    sensor,
                    privateFlag
                  );
                  transactionToast(txhash, sensor);
                  setLoading(false);
                } catch (e) {
                  console.log(e);
                  setLoading(false);
                }
              }}
            >
              Emulate
            </Button>
          </Box>
        </Card>
      )}
    </Fragment>
  );
}
