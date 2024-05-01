import mongoose from "mongoose";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroBase from "../erros/ErroBase.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

/* eslint-disable no-unused-vars */
function manipuladorDeErros (err, req, res, next) { 
  if (err instanceof mongoose.Error.CastError) { 
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(err).enviarResposta(res);
  } else if (err instanceof NaoEncontrado){
    err.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
