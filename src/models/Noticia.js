
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
    return formatarDataDePublicacao(this.dataDePublicacao)
  }
}
export function formatarDataDePublicacao(dataDePublicacao) {
  const d = new Date(dataDePublicacao)
  return d.toLocaleDateString('pt-BR')
}
