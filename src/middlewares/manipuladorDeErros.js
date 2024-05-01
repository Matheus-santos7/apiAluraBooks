import mongoose from "mongoose";

/* eslint-disable no-unused-vars */
function manipuladorDeErros (err, req, res, next) { 
  if (err instanceof mongoose.Error.CastError) { 
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
  } else if (err instanceof mongoose.Error.ValidationError) {
    const mensagensErr = Object.values(err.errors).map(err => err.message).join(", ");

    res.status(400).send({message: `Houve um erro de validação: ${mensagensErr}`});
  }
  else {
    res.status(500).send({message: "erro interno no servidor"});
  }
}

export default manipuladorDeErros;
