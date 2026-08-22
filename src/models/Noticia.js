export class Noticia {
  constructor(nome, endereco, descricao, dataDePublicacao, categoria, fonteNome = '') {
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.dataDePublicacao = dataDePublicacao;
    this.categoria = categoria;
    this.fonteNome = fonteNome;
  }
}