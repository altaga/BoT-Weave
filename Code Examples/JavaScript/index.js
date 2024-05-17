const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  apikey: "API_KEY",
  dataIn: {
    key1: "value",
    key2: "value2",
    key3: "value3",
  },
  sensor: "SENSOR_NAME",
  private: false,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(
  "https://us-central1-iot-weave.cloudfunctions.net/addData",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
