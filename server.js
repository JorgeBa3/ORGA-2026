const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // El asterisco significa "permitir conexiones desde cualquier origen"
    methods: ["GET", "POST"]
  }
});
// 1. Configurar el puerto serial
const port = new SerialPort({
  path: 'COM3', // Tu placa está aquí
  baudRate: 115200,
});

// 2. Usar un Parser para leer líneas completas (el \n que enviamos desde el ESP32)
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// 3. Cuando el puerto se abre
port.on('open', () => {
  console.log('✅ Puerto COM3 abierto con éxito');
});

// 4. Leer los datos y enviarlos al Frontend
parser.on('data', (data) => {
  console.log('Datos recibidos del ESP32:', data);
  
  try {
    // Convertimos el texto JSON en un objeto real de JS
    const jsonLectura = JSON.parse(data);
    // Lo enviamos a todos los clientes conectados al Frontend
    io.emit('datos_sensor', jsonLectura);
  } catch (err) {
    console.error('Error parseando JSON:', err.message);
  }
});

// Servidor web en el puerto 3000
server.listen(3000, () => {
  console.log('🚀 Backend corriendo en http://localhost:3000');
});