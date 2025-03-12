const file_system = require("fs");
const http = require("http");
const path = require("path");

// 1. Función para calcular el promedio de un arreglo
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}

// Prueba del promedio
const numbers = [10, 20, 30, 40, 50];
console.log("El promedio es:", calculateAverage(numbers));

// 2. Función para escribir un string en un archivo
function writeStringToFile(text) {
  file_system.writeFileSync("output.txt", text);
  console.log("Texto escrito en output.txt");
}

// Prueba de escritura
writeStringToFile("Hola desde Node.js");

// 3. Problema adicional: verificar si un número es primo
function isPrime(number) {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

// Prueba de número primo con setTimeout (usando tu idea)
setTimeout(() => {
  const testNumber = 17;
  console.log(`${testNumber} ${isPrime(testNumber) ? "es" : "no es"} primo`);
}, 2000); // Espera 2 segundos

// 4. Servidor web que sirve el validador de contraseñas del lab6
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/Lab6.html") {
    const filePath = path.join(__dirname, "Lab6.html");
    file_system.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al cargar la página");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página no encontrada");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
