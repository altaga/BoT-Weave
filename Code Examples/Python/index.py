import http.client
import json

conn = http.client.HTTPSConnection("us-central1-iot-weave.cloudfunctions.net")
payload = json.dumps({
    "apikey": "API_KEY",
    "dataIn": {
        'key1': 'value',
        'key2': 'value2',
        'key3': 'value3'
    },
    "sensor": "SENSOR_NAME",
    "private": False
})
headers = {
  'Content-Type': 'application/json'
}
conn.request("POST", "/addData", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))