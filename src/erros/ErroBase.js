class ErroBase extends Error {
  constructor(mensagem = "Erro interno do servidor", status = 500) {
    super(mensagem);
    this.message = mensagem;
    this.status = status;
  }
  
  enviarResposta(res) {
    return res.status(this.status).send({
      status: this.status,
      mensagem: this.message
    });
  }
}

export default ErroBase;