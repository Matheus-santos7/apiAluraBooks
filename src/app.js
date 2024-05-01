import express from "express";
import mongoose from "mongoose";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";


const conexao = await conectaNaDataBase();

conexao.on("error", console.log.bind(console, "Erro de conexão com o banco de dados"));
conexao.once("open", () => {console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

const app = express();
app.use(express.json());
routes(app);

// eslint-disable-next-line no-unused-vars
app.use( (erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
  } else {
    res.status(500).send({message: "erro interno no servidor"});
  }
});

export default app;