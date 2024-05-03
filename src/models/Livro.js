import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { 
      type: String 
    },
    titulo: { type: String,
      required: [true, "O titulo do livro é obrigatorio"] 
    },
    autor: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O nome do autor(a) é obrigatorio"] 
    },
    editora: { 
      type: String, 
      required: [true, "O nome da editora é obrigatorio"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "As editoras {VALUE} não são aceitas"

      }
    },
    numeroPaginas: { 
      type: Number, 
      validate:{
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    },
  },
);

const livros = mongoose.model("livros", livroSchema);

export default livros;
