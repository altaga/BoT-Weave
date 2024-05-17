import { getCookie, setCookie } from "@/actions/cookies";
import { getObjectData } from "@/actions/getObjectData";
import { getObjectsData } from "@/actions/getObjectsData";
import ContextModule from "@/utils/contextModule";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Fragment, useContext, useEffect, useState } from "react";
import MyGaugeChart from "./charts/gauge";
import MyDetection from "./charts/detection";

const chartsOptions = [
  {
    value: 0,
    label: "Gauge",
  },
  {
    value: 1,
    label: "Detection",
  },
];

function convertInJSON(data) {
  let tempJson = {};
  data.reverse().forEach((obj) => {
    tempJson[obj.sensor] = obj;
  });
  return tempJson;
}

export default function Devices() {
  const { address } = useWeb3ModalAccount();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState({});
  const [sensorData, setSensorData] = useState({});
  const [addChart, setAddChart] = useState(0);
  const context = useContext(ContextModule);
  const check = async () => {
    setLoading(true);
    const data = await getObjectsData(address);
    context.setState({ data });
    setLoading(false);
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const setupCookies = async () => {
    getCookie(`dashboards:charts`)
      .then((res) => {
        setCharts(res);
      })
      .catch(() => {
        setCharts({});
      });
  };

  const getSensorsData = async (data) => {
    const tempSensorData = await Promise.all(
      Object.keys(data).map((key) => getObjectData(data[key].url))
    );
    let tempJson = {};
    tempSensorData.forEach((obj, index) => {
      tempJson[Object.keys(data)[index]] = obj;
    });
    setSensorData(tempJson);
  };

  useEffect(() => {
    const dataJSON = convertInJSON(context.state.data);
    setData(dataJSON);
    setupCookies();
    getSensorsData(dataJSON);
  }, []);

  return (
    <Card variant="outlined" sx={{ width: "80%", height: "80%" }}>
      <Box
        sx={{
          height: "10%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Typography
            sx={{ marginLeft: "20px" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Dashboards
          </Typography>
          <IconButton
            sx={{ marginRight: "20px" }}
            disabled={loading}
            onClick={() => check()}
            color="secondary"
            aria-label="refresh"
          >
            <CachedIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <Box
        sx={{
          height: "10%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable tabs"
        >
          {Object.keys(data).map((device, index) => (
            <Tab key={index} label={device} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      <Box
        sx={{
          height: "80%",
          overflowY: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(data).length > 0 ? (
          Object.keys(data).map((device, index) => (
            <Fragment key={index}>
              {index === value && (
                <Fragment>
                  {charts[value]?.map((chart, index2) => {
                    if (chart === 0) {
                      return (
                        <div key={index2} style={{ width: "50%", height: "auto" }}>
                          <MyGaugeChart
                            data={sensorData[device]}
                            id={`${device}:${index2}`}
                          />
                        </div>
                      );
                    }
                    if (chart === 1) {
                      return (
                        <div key={index2} style={{ width: "50%", height: "auto" }}>
                          <MyDetection
                            data={sensorData[device]}
                            id={`${device}:${index2}`}
                          />
                        </div>
                      );
                    }
                  })}
                  <div style={{ width: "50%", height: "auto" }}>
                    <Card
                      variant="outlined"
                      sx={{ width: "90%", margin: "20px" }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="outlined-select-chart"
                          select
                          label="Select"
                          helperText="Please select your chart"
                          onChange={(e) => {
                            setAddChart(e.target.value);
                          }}
                          value={addChart}
                        >
                          {chartsOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <IconButton
                          disabled={loading}
                          onClick={() => {
                            let tempCharts = { ...charts };
                            if (tempCharts[value] === undefined) {
                              tempCharts[value] = [];
                              tempCharts[value].push(addChart);
                            } else {
                              tempCharts[value].push(addChart);
                            }
                            setCharts(tempCharts);
                            setCookie(`dashboards:charts`, tempCharts);
                            setAddChart(0);
                          }}
                          color="secondary"
                          aria-label="refresh"
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  </div>
                </Fragment>
              )}
            </Fragment>
          ))
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            No Devices Found
          </Typography>
        )}
      </Box>
    </Card>
  );
}
