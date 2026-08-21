class Noticias{
    constructor(nome, endereco, descricao, dataPublicacao, categorias){
if (
      typeof nome !== "string" ||
      typeof endereco !== "string" ||
      typeof descricao !== "string" ||
      typeof dataPublicacao !== "string" ||
      typeof categorias !== "string"
    ){
      console.log(`Os dados informados não estão no formato correto:
      nome: texto, endereço: texto, descrição: texto, DataDePublicação: texto, categorias; texto`);
      return;
    }
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.dataPublicacao = dataPublicacao;
    this.categorias = categorias;
    }   
}

const noticias[]

function adicionarNoticia(nome, endereco, descricao, dataPublicacao, categorias) {
    const noticia = new Noticias(nome,endereco,descricao,dataPublicacao,categorias);
noticias.push(noticia);
}