#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include "certs.h"
#include "Adafruit_SHT4x.h"

Adafruit_SHT4x sht4 = Adafruit_SHT4x();
JsonDocument doc;
JsonDocument dataIn;
WiFiMulti WiFiMulti;

const int gasSensor = 26;

char *string2char(String command);

void setup() {
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);
  while ((WiFiMulti.run() != WL_CONNECTED)) {
    // Wait for WiFi Start
  }
  setClock();
  if (!sht4.begin()) {
    while (1) delay(1);
  }
  sht4.setPrecision(SHT4X_HIGH_PRECISION);
  sht4.setHeater(SHT4X_NO_HEATER);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
}

void loop() {
  sensors_event_t humidity, temp;
  sht4.getEvent(&humidity, &temp);  // populate temp and humidity objects with fresh data

  dataIn["temp"] = temp.temperature;
  dataIn["hum"] = humidity.relative_humidity;

  // Dont Modify Nothing After This

  // API Call Preparation
  doc["apikey"] = apikey;
  doc["sensor"] = sensorName;
  doc["private"] = privateFlag;
  // Pre Process the JSON object
  doc["dataIn"] = dataIn;
  String data;
  serializeJson(doc, data);
  // Send API Call
  sendData(data);
  // Wait 10 min
  delay(1000 * 60 * 10);  // Testing
}

int getData() {
  return analogRead(gasSensor);
}

void sendData(String httpRequestData) {
  WiFiClientSecure *client = new WiFiClientSecure;
  if (client) {
    client->setCACert(CERT_CA);
    {
      // Add a scoping block for HTTPClient https to make sure it is destroyed before WiFiClientSecure *client is
      HTTPClient https;
      if (https.begin(*client, "https://us-central1-bot-weave.cloudfunctions.net/addData")) {  // HTTPS
        // start connection and send HTTP header
        https.addHeader("Content-Type", "application/json");
        https.setTimeout(1000 * 30);  // 30 Seconds
        int httpCode = https.POST(httpRequestData);
        if (httpCode > 0) {
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = https.getString();
          }
        }
        https.end();
      } else {
        // No Connection
      }
    }
    delete client;
  }
}

void setClock() {
  configTime(0, 0, "pool.ntp.org");
  time_t nowSecs = time(nullptr);
  while (nowSecs < 8 * 3600 * 2) {
    delay(500);
    yield();
    nowSecs = time(nullptr);
  }
  struct tm timeinfo;
  gmtime_r(&nowSecs, &timeinfo);
}

char *string2char(String command) {
  if (command.length() != 0) {
    char *p = const_cast<char *>(command.c_str());
    return p;
  }
}