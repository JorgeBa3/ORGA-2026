#  Dashboard en Tiempo Real: ESP32 + DHT11 + Node.js

Este proyecto es un ejemplo práctico de **comunicación serial bidireccional y WebSockets**. Consiste en un sistema que lee la temperatura y humedad desde un sensor DHT11 conectado a un ESP32, transmite los datos por el puerto serial hacia un servidor local en Node.js, y finalmente los grafica en tiempo real en un panel de control web.

Desarrollado como proyecto demostrativo para exposición sobre **Comunicación Serial**.

---

## Arquitectura del Proyecto

El flujo de los datos sigue esta ruta:
1. **ESP32 (C++):** Lee el sensor DHT11 y envía un objeto JSON por el puerto serial (USB).
2. **Backend (Node.js):** Escucha el puerto serial usando la librería `serialport`. Al recibir una línea de datos completa, la retransmite mediante WebSockets.
3. **Frontend (HTML/JS):** Se conecta al servidor mediante `Socket.io`, recibe los datos en tiempo real, calcula promedios y actualiza gráficas interactivas usando `Chart.js`.

---

##  Requisitos

### Hardware
* Placa ESP32.
* Sensor de Temperatura y Humedad DHT11 (o DHT22).
* Cables jumper y protoboard.
* Cable USB para conexión a la PC.

### Software
* [Arduino IDE](https://www.arduino.cc/en/software) (para programar el ESP32).
* [Node.js](https://nodejs.org/) (para correr el servidor local).

---

## Instalación y Uso

### 1. Configuración del ESP32 (Microcontrolador)
1. Abre el Arduino IDE.
2. Instala las librerías **"DHT sensor library"** (por Adafruit) y **"Adafruit Unified Sensor"**.
3. Conecta el pin de datos del DHT11 al **GPIO 4** del ESP32.
4. Carga el código `.ino` en tu placa.
5. Verifica en qué puerto COM quedó conectada tu placa (ej. `COM3`, `COM5`, o `/dev/ttyUSB0` en Linux/Mac).

### 2. Configuración del Backend (Servidor Node.js)
1. Abre una terminal en la carpeta del proyecto.
2. Inicializa el proyecto e instala las dependencias necesarias:
   ```bash
   npm init -y
   npm install serialport @serialport/parser-readline express socket.io
    ```