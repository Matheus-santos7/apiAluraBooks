import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
  const err404 = new NaoEncontrado();
  next(err404);
}

export default manipulador404;