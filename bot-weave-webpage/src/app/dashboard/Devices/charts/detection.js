import { getCookie, setCookie } from "@/actions/cookies";
import { Box, Card, Divider, TextField } from "@mui/material";
import React, { useCallback, useEffect } from "react";

export default function MyDetection(props) {
  const [labels, setLabels] = React.useState([]);
  const [text, setText] = React.useState("");
  const [key, setKey] = React.useState("");
  const setupCookies = useCallback(async () => {
    getCookie(`${props.id}:key`)
      .then((res) => {
        setKey(res);
      })
      .catch(() => {
        setKey("");
      });
    getCookie(`${props.id}:labels`)
      .then((res) => {
        setLabels(res);
      })
      .catch(() => {
        setLabels([]);
      });
    getCookie(`${props.id}:text`)
      .then((res) => {
        setText(res);
      })
      .catch(() => {
        setText("");
      });
  }, [props.id]);

  useEffect(() => {
    setupCookies();
  }, []);

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
              setCookie(`${props.id}:labels`, e.target.value.split(","));
              setCookie(`${props.id}:text`, e.target.value);
              setLabels(e.target.value.split(","));
              setText(e.target.value);
            }}
            value={text}
            type="text"
            id="outlined-basic"
            label="Labels"
            variant="outlined"
          />
        </div>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        Label Detected: {labels?.[props.data?.[key]] ?? "Unknown"}
      </Box>
    </Card>
  );
}
