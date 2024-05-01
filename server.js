// Criação de um servidor HTTP com Node.js - SEM EXPRESS

// import http from "http";

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//  res.writeHead(200, { "Content-Type": "text/plain" });
//  res.end("Curso de Node.js");
// });

// server.listen(PORT, () => {
//  console.log("servidor escutando!");
// });

//----------------------------------------------------------
import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

});
