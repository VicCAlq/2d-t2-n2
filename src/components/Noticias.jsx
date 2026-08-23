class Noticias {
  constructor(nome, endereco, descricao, dataDePublicacao, categoria) {
    if (
      typeof nome !== "string" ||
      typeof endereco !== "string" ||
      typeof descricao !== "string" ||
      typeof dataDePublicacao !== "string" ||
      typeof categoria !== "string"
    ) {
      console.log(`Os dados informados não estão no formato correto:nome: texto, endereço: texto, descrição: texto,data de publicação: texto, categoria: texto`);
      return;
    }

    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.dataDePublicacao = dataDePublicacao;
    this.categoria = categoria;
  }
}

const noticias = [];

function adicionarNoticia(nome,endereco,descricao,dataDePublicacao,categoria) {
  const noticia = new Noticias(nome,endereco,descricao,dataDePublicacao,categoria);
  if (noticia.nome !== undefined) {
    noticias.push(noticia);}
  return noticia;
}

export { Noticias, noticias, adicionarNoticia };