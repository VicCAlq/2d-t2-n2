
export class Noticia {
  constructor(nome, endereco, descricao, dataDePublicacao, categoria, fonteNome) {
    this.id = crypto.randomUUID()
    this.nome = nome
    this.endereco = endereco
    this.descricao = descricao
    this.dataDePublicacao = dataDePublicacao
    this.categoria = categoria
    this.fonteNome = fonteNome
  }
  dataFormatada() {
    const d = new Date(this.dataDePublicacao)
    return d.toLocaleDateString('pt-BR')
  }
}
