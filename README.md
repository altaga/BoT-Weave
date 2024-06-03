# BoT Weave

<img src="https://i.ibb.co/cvmPLp0/New-Project-3.png">

BoT-Weave seamlessly integrates IoT data with BNB Greenfield.

# Fast Links:

WebPage: [CLICK HERE](https://bot-weave.vercel.app/)

Video Demo: [CLICK HERE](...pending)

# Introduction:

The world of IoT is experiencing an unprecedented boom. Billions of connected devices generate a massive volume of data in real time, from industrial sensors to smart home devices. This information has enormous potential to transform industries, optimize processes and improve quality of life.

<img src="https://i.ibb.co/xJHtCSV/image.png">

# Problem:

The main problem lies in taking advantage of the value of the data from IoT devices as well as guaranteeing its security, integrity and scalability.

<img src="https://i.ibb.co/9ZLcFZq/image.png">

Traditional approaches based on centralized servers have several disadvantages:

- Security vulnerabilities: Centralized servers are attractive targets for cyber attacks.[1](#references)

- Lack of scalability: As the number of IoT devices increases, centralized infrastructure can become overloaded, making it difficult to efficiently store and process data.

- High costs: Reliance on centralized servers implies ongoing infrastructure and maintenance costs for companies. [2](#references)

To solve all these problems we created BoT Weave.

# Solution:

BoT Weave is an innovative platform offering a secure, scalable and cost-effective solution for IoT data capture and management. In addition to the immutability of blockchain.

<img src="https://i.ibb.co/WBSXT1X/image-2-1.png">

Through BNB Greenfield we can maintain the immutability, security and even privacy of the data that we upload to the blockchain through IoT devices.

<img src="https://i.ibb.co/59dMPCy/image.png">

# Connection Diagram:

<img src="https://i.ibb.co/HFtF7vS/Diagram-drawio.png">

- Sensors: All sensors that connect to our Gateway and these will only be able to upload data to BoT Weave using an APIKEY.

- Cloud Gateway: A common scheme to control data from IoT sensors is the use of Gateways, this communication from the sensors to the Gateway is through HTTPS to maintain security in the communication. [Cloud Functions](./Cloud%20Functions/)

- DCellar: We use the DCellar service to upload data from IoT devices as files to the Greenfield blockchain and its APIs to obtain the files to the web platform.

- BoT Weave: Our platform allows us to create and manage API Keys. In addition to being able to view the data uploaded to Greenfield and the sensor data in real time.

# Hardware Diagrams:

Being an IoT platform, we added two devices and their specifications as an example to show that the platform is functional.

<img src="https://i.ibb.co/S3KRT2X/Image-3.png">

NOTE: the platform is not limited to these two devices, they are only a quick guide so you can implement your own devices.

## Edge Driving Monitor:

<img src="https://i.ibb.co/xsstC9K/Edge-Driving-drawio.png">

- ESP32: Using this microcontroller we decode the readings from the Grove Vision AI V2 sensor through I2C and we also handle the encryption of the request to the BoT Weave API through HTTPS.

- Grove Vision AI V2: This sensor does not allow loading an AI inference model created with Edge Impulse and running it independently of the microcontroller. As well as being able to read it from the microcontroller using I2C.
  
## Environment Monitor:

<img src="https://i.ibb.co/Lx52MJ0/Environment-Sensor-drawio.png">

- ESP32: Using this microcontroller we decode the readings from the Grove SHT40 sensor and also handle the encryption of the request to the BoT Weave API through HTTPS.

- SHT40: This sensor allows the reading of Temperature and Relative Humidity data in the environment using the I2C protocol.

# BoT Weave Platform:

Our web platform provides all the tools to facilitate users' creation and development of IoT devices connected to the Blockchain thanks to BNB Greenfield with DCellar.

<img src="https://i.ibb.co/k3Wf6C6/Image.png">

## Connect Page:

The connection page is very simple thanks to Web3Modal, which is a component of WalletConnect that allows you to carry out operations and manage wallets with the platform.

<img src="https://i.ibb.co/N2BHJVv/Screenshot-2024-05-18-121310.png">

We are compatible with all popular wallets on the market, however it must have BNB Greefield Mainnet configured correctly.

<img src="https://i.ibb.co/WDFjpr3/Screenshot-2024-05-18-121321.png">

To log in you must take a sig from our login message to confirm your identity and ownership of the address.

<img src="https://i.ibb.co/JFxp4GB/Screenshot-2024-05-18-121353.png">

## Account Page:

The account page is the first page that all users will be able to view once they log in to our dApp, in this you will be able to see a summary of your account, both the balance in BNB Greenfield, the devices that are uploading data to the platform and the number of files.

<img src="https://i.ibb.co/QCvKThk/Screenshot-2024-05-18-121412.png">

## Devices:

The devices page allows us to view the data sent from the IoT devices to the platform, for now our page has two types of configurable graphs, Gauge and Detection.

### Gauge:

In the key section, you will have to write the key that you have used to send the IoT data to the platform, in this case the environment sensor sends the data as a JSON and this data can be configured as absolute values or percentages.

<img src="https://i.ibb.co/R3JFj7V/Screenshot-2024-05-18-121449.png">

Data Format:

    {
        "temp": 29.10162354,
        "hum": 52.96086121
    }

You can use the keys you want, as we mentioned before, this is just an example, but you can send the numerical data you want, whether integer or float.

### Detection:

This chart allows us to decode the data detected by an AI sensor. In this case the **Detection** key was used

<img src="https://i.ibb.co/hm39c4q/Screenshot-2024-05-18-121439.png">

Data Format:

    {
        "detection": 1
    }

Again, this key was selected arbitrarily, you can send the data with the key you prefer, however you must send the detection data using consecutive numbers starting from 0.

    0 -> Cars
    1 -> Motorcycle
    2 -> Pedestrian

## Data:

On this page we can see all the data that the devices have sent to the platform, with this we can previously view the data that has been sent to the platform and thus debug that it is correct.

<img src="https://i.ibb.co/GHshMFf/Screenshot-2024-05-18-121459.png">

The data can be viewed in the BNB Greenfield explorer or directly open the file.

BNB Greenfield Scan:

<img src="https://i.ibb.co/1Q34pbY/Screenshot-2024-05-18-123953.png">

File Directly:

<img src="https://i.ibb.co/hywCmsF/image.png">

## API Keys:

The API Keys page allows us to manage active API Keys on the platform, as well as rotate APIKeys to improve security. This is generated through a wallet signature.

### Create API Key:

The first thing we have to do is create our first API Key.

<img src="https://i.ibb.co/xgv6dSf/Screenshot-2024-05-18-125704.png">

After pressing the button to create an API Key you will have to sign the creation message.

<img src="https://i.ibb.co/vVfv4LZ/Screenshot-2024-05-18-125720.png">

Finally, if everything goes well, you will get your API Key.

<img src="https://i.ibb.co/0VjHM69/Screenshot-2024-05-18-125755.png">

Once you have your API Key, you can use it in any of the [Code Examples](./Code%20Examples/) that we have in the repository.

## Emulator:

The emulator is for testing purposes only, you will have to have an API Key already created for it to work since it will consume your API Key.

<img src="https://i.ibb.co/8sjVxSD/Screenshot-2024-05-18-121520.png">

All data sent to the platform must be in JSON format to be displayed in the Charts section.

    {
        "key1": "value1",
        "key2": 0,
        "key3": 0.1,
        "key4": true
    }

Within the Cloud Functions we upload the data as files with the following code.

[CODE](./Cloud%20Functions/addData/index.js)

# IoT Examples:

As part of this project we have made 4 code examples with which you can make your own IoT devices, these are made in the 4 most popular languages for IoT development.

[Code Examples](./Code%20Examples/)

At the same time, we leave the schematics and codes of 2 particular devices that we built for the demo.

## Edge Driving Monitor:

The purpose of this device is to decode the data detected from the Grove Vision AI V2 and send it to BNB Greenfield, through our API.

[DEVICE CODE](./Device%20Examples/Edge%20Driving%20Monitor/)

<img src="https://i.ibb.co/xsstC9K/Edge-Driving-drawio.png">

To make it work you must complete your WiFi data and API Key in [Certs.h](./Device%20Examples/Edge%20Driving%20Monitor/certs.h)

    static const char* ssid     = "YOUR_SSID";          // Your WiFi SSID
    static const char* password = "YOUR_PASSWORD";      // Your WiFi Password
    static const char* apikey = "YOUR_API_KEY";         // Your BoT Weave API Key
    static const char* sensorName = "YOUR_SENSOR_NAME"; // Your Sensor Name
    static const bool privateFlag = false;              // Private or Public Data

<img src="https://i.ibb.co/7KZddjN/20240518-133958.jpg">

## Environment Sensor:

The purpose of this device is to read the data detected from the STH40, once this is done, it is uploaded to BNB Greenfield, through our service.

[DEVICE CODE](./Device%20Examples/Edge%20Driving%20Monitor/)

<img src="https://i.ibb.co/Lx52MJ0/Environment-Sensor-drawio.png">

To make it work you must complete your WiFi data and API Key in [Certs.h](./Device%20Examples/Environment%20Sensor/certs.h)

    static const char* ssid     = "YOUR_SSID";          // Your WiFi SSID
    static const char* password = "YOUR_PASSWORD";      // Your WiFi Password
    static const char* apikey = "YOUR_API_KEY";         // Your BoT Weave API Key
    static const char* sensorName = "YOUR_SENSOR_NAME"; // Your Sensor Name
    static const bool privateFlag = false;              // Private or Public Data

<img src="https://i.ibb.co/zVq8cpM/20240518-134055.jpg">



# Commentary and final words:

Why do we need DePIN and and a blockchain of things?

This is the main question, According to a Gartner study, blockchain technology will add $3.1 trillion in business value by 2030. The most exciting development is how these two technologies come together. Because of the nature of blockchain and IoT, the two are an obvious match. Combining them unlocks a series of possibilities that could propel the next big thing. Businesses can be transformed by sending your IoT data to an immutable blockchain ledger for added accountability, security and trust.

And well BNB chain recognizes that as one of the main tracks is developing an IoT system with BNB greenfield.
We think the current implementation more than solves most of the problems and showcases a great integration of IoT devices witth BNB Greenfield.



# References:

1. https://www.techtarget.com/iotagenda/definition/IoT-security-Internet-of-Things-security
2. https://www.techtarget.com/searchcio/news/366570542/Cloud-costs-continue-to-rise-in-2024

# Table of contents:

- [BoT-Weave](#bot-weave)
- [Fast Links:](#fast-links)
- [Introduction:](#introduction)
- [Problem:](#problem)
- [Solution:](#solution)
- [Connection Diagram:](#connection-diagram)
- [Hardware Diagrams:](#hardware-diagrams)
  - [Edge Driving Monitor:](#edge-driving-monitor)
  - [Environment Monitor:](#environment-monitor)
- [BoT Weave Platform:](#bot-weave-platform)
  - [Connect Page:](#connect-page)
  - [Account Page:](#account-page)
  - [Devices:](#devices)
    - [Gauge:](#gauge)
    - [Detection:](#detection)
  - [Data:](#data)
  - [API Keys:](#api-keys)
    - [Create API Key:](#create-api-key)
  - [Emulator:](#emulator)
- [IoT Examples:](#iot-examples)
  - [Edge Driving Monitor:](#edge-driving-monitor-1)
  - [Environment Sensor:](#environment-sensor)
- [EPIC DEMO:](#epic-demo)
- [Commentary and final words:](#commentary-and-final-words)
- [References:](#references)
- [Table of contents:](#table-of-contents)
