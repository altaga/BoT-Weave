# BoT-Weave
 BoT-Weave seamlessly integrates IoT data with BNB Greenfield.

# Fast Links:

WebPage: [CLICK HERE](https://bot-weave.vercel.app/)

Video Demo: [CLICK HERE](...pending)

# Introduction:



# Problem:



# Solution:

BoT Weave es una plataforma inovadora que facilita la captura de datos desde dispositivos IoT con la seguridad y la inmutabilidad de blockchain.

<img src="https://i.ibb.co/WBSXT1X/image-2-1.png">

A travez de BNB Greenfield podemos mantener la inmutabilidad, seguridad e incluso privacidad de los datos que nosotros subimos a la blockchain mediante los devices IoT.

<img src="https://i.ibb.co/59dMPCy/image.png">

# Connection Diagram:

<img src="https://i.ibb.co/HFtF7vS/Diagram-drawio.png">

- Sensores: Todos los sensores que se conecten a nuestra Gateway y estos solo podran subir datos a BoT Weave mediante una APIKEY.

- Cloud Gateway: Un esquema comun para controlar datos desde IoT sensors es el uso de Gateways, esta comunicacion desde los sensores a la Gateway es atravez de HTTPS para mantener la seguridad en la comunicacion. [Cloud Functions](./Cloud%20Functions/)

- DCellar: Utilizamos el servicio de DCellar para poder realizar la subida de datos de los devices IoT como archivos a la blockchain de Greenfield y sus API para obtener los archivos hacia la plataforma web.

- BoT Weave: Nuetra plataforma nos permite crear y gestionar las API Keys. Ademas de poder visualizar los datos subidos a Greenfield y los datos de los sensores en tiempo real.

# Hardware Diagrams:

Al ser una plataforma de IoT agregamos dos dispositivos y sus especificaciones como ejemplo para mostrar que la plataforma es funcional.

<img src="https://i.ibb.co/S3KRT2X/Image-3.png">

NOTA: la plataforma no esta limitada a estos dos devices, solo son una guia rapida para que puedas implementar tus propios devices.

## Edge Driving Monitor:

<img src="https://i.ibb.co/xsstC9K/Edge-Driving-drawio.png">

- ESP32: Mediante este microcontrolador decodificamos las lecturas del sensor del Grove Vision AI V2 mediante I2C y ademas manejamos el cifrado de la request a la API de BoT Weave mediante HTTPS.

- Grove Vision AI V2: Este sensor no permite cargar un modelo de inferencia de AI creado con Edge Impulse y correrlo de forma independiente del microcontrolador. Asi como poder leerlo desde el microcontrolador mediante I2C.

## Environment Monitor:

<img src="https://i.ibb.co/Lx52MJ0/Environment-Sensor-drawio.png">

- ESP32: Mediante este microcontrolador decodificamos las lecturas del sensor Grove SHT40 y ademas manejamos el cifrado de la request a la API de BoT Weave mediante HTTPS.

- SHT40: Este sensor permite la lectura de datos de Temperatura y Humedad relativa en el ambiente mediante protocolo I2C.

# BoT Weave Platform:

Nuestra plataforma web provee todas las herramientas para facilitar a los usuarios le creacion y desarollo de devices IoT conectados a la Blockchain gracias a BNB Greenfield con DCellar.

<img src="https://i.ibb.co/k3Wf6C6/Image.png">

## Connect Page:

La pagina de conexion es muy sencilla gracias a Web3Modal, el cual es un componente de WalletConnect que permite realizar operaciones y gestion de las wallets con la plataforma.

<img src="https://i.ibb.co/N2BHJVv/Screenshot-2024-05-18-121310.png">

Somos compatibles con todas las wallets populares de mercado, sin embargo esta tiene que tener configurada correctamente BNB Greefield Mainnet.

<img src="https://i.ibb.co/WDFjpr3/Screenshot-2024-05-18-121321.png">

Para inicar sesion deberas realizar una sign de nuestro mensaje de inicio de sesion para confirmar tu identidad y ownership de la address.

<img src="https://i.ibb.co/JFxp4GB/Screenshot-2024-05-18-121353.png">

## Account Page:

La account page es la primera pagina que todos los usuarios van a poder visualizar una vez hagan login a nuestra dApp, en esta podras ver un resumen de tu cuenta, tanto el balance en BNB Greenfield, los devices que esten subiendo datos a la plataforma y la cantidad de archivos.

<img src="https://i.ibb.co/QCvKThk/Screenshot-2024-05-18-121412.png">

## Devices:

La pagina de devices nos permite visualizar los datos enviados desde los devices IoT hacia la plataforma, por ahora nuestra pagina tiene dos tipos de graficas configurables, Gauge y Detection.

### Gauge:

En la seccion de key, tendras que escribir la key que hayas utilizado para mandar los datos IoT hacia la plataforma, en este caso el environment sensor manda los datos como un JSON y estos datos se pueden configurar como valores absolutos o porcentajes.

<img src="https://i.ibb.co/R3JFj7V/Screenshot-2024-05-18-121449.png">

Data Format:

    {
        "temp": 29.10162354,
        "hum": 52.96086121
    }

Puedes usar las keys que quieras, como mencionamos anteriormente, esta solo es un ejemplo, pero puedes mandar los datos numericos que quieras, ya sean integer or float.

### Detection:

Esta chart nos permite decodificar los datos detectados por un sensor AI. En este caso se utilizo la key **Detection**

<img src="https://i.ibb.co/hm39c4q/Screenshot-2024-05-18-121439.png">

Data Format:

    {
        "detection": 1
    }

Nuevamente esta key se selecciono de forma arbitraria, puedes mandarlos datos con la key que prefieras, sin embargo debes de mandar los datos de detecciones mediante numeros consecutivos iniciando desde 0.

    0 -> Cars
    1 -> Motorcycle
    2 -> Pedestrian

## Data:

En esta pagina podremos ver todos lo datos que los devices hayan enviado a la plataforma, con esto podremos visualizar previamente los datos que se hayan mandado a la platforma y asi debuggear que estos sean correctos.

<img src="https://i.ibb.co/GHshMFf/Screenshot-2024-05-18-121459.png">

Los datos pueden visualizarse en el explorer de BNB Greenfield o directamente abrir el archivo.

BNB Greenfield Scan:

<img src="https://i.ibb.co/1Q34pbY/Screenshot-2024-05-18-123953.png">

File Directly:

<img src="https://i.ibb.co/hywCmsF/image.png">

## API Keys:

La pagina de API Kesys nos permite gestionar las APIKeys activas en la plataforma, asi como rotar las APIKeys para mejorar la seguridad. Esta se genera atravez de una firma de la wallet.

### Create API Key:

Lo primero que tenemos que hacer es crear nuestra primera API Key.

<img src="https://i.ibb.co/xgv6dSf/Screenshot-2024-05-18-125704.png">

Posterior a presionar el boton para crear una API Key tendras que firmar el mensaje de creacion.

<img src="https://i.ibb.co/vVfv4LZ/Screenshot-2024-05-18-125720.png">

Finalmente si todo sale bien, obtendras tu API Key.

<img src="https://i.ibb.co/0VjHM69/Screenshot-2024-05-18-125755.png">

Una vez tengas tu API Key, podras utilizarla en cualquiera de los [Code Examples](./Code%20Examples/) que tenemos en el repositorio.

## Emulator:

El emulador es unicamente con fines de testing, tendras que tener una API Key ya creada para que este funcione ya que va a consumir tu API Key.

<img src="https://i.ibb.co/8sjVxSD/Screenshot-2024-05-18-121520.png">

Todos los datos que se manden a la plataforma deben de ser en formato JSON para visualizarlos en la seccion de Charts.

    {
        "key1": "value1",
        "key2": 0,
        "key3": 0.1,
        "key4": true
    }

# IoT Examples:

Como parte de ese proyecto hemos realizado 4 ejemplos de codigo con los cuales tu puedes realizar tus propios devices IoT, estos estan realizados en los 4 lenguajes mas populares para el desarrollo de IoT.

[Code Examples](./Code%20Examples/)

A su vez dejamos los esquemas y codigos de 2 devices en particular que construimos nosotros para el demo.

## Edge Driving Monitor:

Este device tiene como fin decodificar los datos detectados desde el Grove Vision AI V2 y los manda a BNB Greenfield, mediante nuestra API.

[DEVICE CODE](./Device%20Examples/Edge%20Driving%20Monitor/)

<img src="https://i.ibb.co/xsstC9K/Edge-Driving-drawio.png">

Para hacer que funcione deberas completar con tus datos de WiFi y API Key en [Certs.h](./Device%20Examples/Edge%20Driving%20Monitor/certs.h)

    static const char* ssid     = "YOUR_SSID";          // Your WiFi SSID
    static const char* password = "YOUR_PASSWORD";      // Your WiFi Password
    static const char* apikey = "YOUR_API_KEY";         // Your BoT Weave API Key
    static const char* sensorName = "YOUR_SENSOR_NAME"; // Your Sensor Name
    static const bool privateFlag = false;              // Private or Public Data

<img src="">

## Environment Sensor:

Este device tiene como fin leer los datos detectados desde el STH40, una vez realizado esto, se suben a BNB Greenfield, mediante nuestro servicio.

[DEVICE CODE](./Device%20Examples/Edge%20Driving%20Monitor/)

<img src="https://i.ibb.co/Lx52MJ0/Environment-Sensor-drawio.png">

Para hacer que funcione deberas completar con tus datos de WiFi y API Key en [Certs.h](./Device%20Examples/Environment%20Sensor/certs.h)

    static const char* ssid     = "YOUR_SSID";          // Your WiFi SSID
    static const char* password = "YOUR_PASSWORD";      // Your WiFi Password
    static const char* apikey = "YOUR_API_KEY";         // Your BoT Weave API Key
    static const char* sensorName = "YOUR_SENSOR_NAME"; // Your Sensor Name
    static const bool privateFlag = false;              // Private or Public Data

<img src="">

# EPIC DEMO:

# Commentary and final words:



# References:

# Table of contents:
