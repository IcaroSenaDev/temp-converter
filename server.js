const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Funções para conversão de temperatura
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function fahrenheitToKelvin(fahrenheit) {
  const celsius = fahrenheitToCelsius(fahrenheit);
  return celsiusToKelvin(celsius);
}

function kelvinToFahrenheit(kelvin) {
  const celsius = kelvinToCelsius(kelvin);
  return celsiusToFahrenheit(celsius);
}

// Rota POST para conversão de temperatura
app.post('/converter', express.json(), (req, res) => {
  const { valor, de, para } = req.body;

  if (de === para) {
    return res.json({ resultado: `${valor} ${de} é igual a ${valor} ${para}.` });
  }

  let resultado;

  if (de === 'Celsius' && para === 'Fahrenheit') {
    resultado = celsiusToFahrenheit(valor);
  } else if (de === 'Fahrenheit' && para === 'Celsius') {
    resultado = fahrenheitToCelsius(valor);
  } else if (de === 'Celsius' && para === 'Kelvin') {
    resultado = celsiusToKelvin(valor);
  } else if (de === 'Kelvin' && para === 'Celsius') {
    resultado = kelvinToCelsius(valor);
  } else if (de === 'Fahrenheit' && para === 'Kelvin') {
    resultado = fahrenheitToKelvin(valor);
  } else if (de === 'Kelvin' && para === 'Fahrenheit') {
    resultado = kelvinToFahrenheit(valor);
  }

  res.json({ resultado });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
