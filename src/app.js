import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDataBase();

conexao.on("error", console.log.bind(console, "Erro de conexão com o banco de dados"));
conexao.once("open", () => {console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;