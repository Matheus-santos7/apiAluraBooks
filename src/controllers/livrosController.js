import {livros} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {


  static listarLivros = async (req, res, next) => {

    try { 
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (err) {
      next(err);    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo } = req.query;

      const regex = new RegExp(titulo, "i");

      const busca = {};

      if (editora) {
        busca.editora = editora;
      }
      if (titulo) {
        busca.titulo = regex;
      }

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;