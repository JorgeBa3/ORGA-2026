#include "DHT.h"

// Definimos el pin donde conectamos el sensor
#define DHTPIN 4     

// Definimos el tipo de sensor (DHT11 o DHT22)
#define DHTTYPE DHT11   

// Inicializamos el sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Iniciamos la comunicación serial a 115200 baudios
  // Esta velocidad debe coincidir en tu Backend
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  // Esperamos un poco entre mediciones
  delay(2000);

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Comprobamos si la lectura falló
  if (isnan(h) || isnan(t)) {
    return; 
  }

  // Enviamos los datos por el puerto serial en formato JSON
  // Esto facilita la vida al programar el Backend
  Serial.print("{\"humedad\": ");
  Serial.print(h);
  Serial.print(", \"temperatura\": ");
  Serial.print(t);
  Serial.println("}");
}