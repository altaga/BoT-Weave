#include <Seeed_Arduino_SSCMA.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include "certs.h"

SSCMA AI;
JsonDocument doc;
JsonDocument dataIn;
WiFiMulti WiFiMulti;

void setup() {
  AI.begin();
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);
  while ((WiFiMulti.run() != WL_CONNECTED)) {
    // Wait for WiFi Start
  }
  setClock();
}

void loop() {
  // Fill This with your data
  dataIn["detection"] = predict();

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

int predict() {
  if (!AI.invoke()) {
    return AI.classes()[0].target;
  } else {
    return -1;
  }
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