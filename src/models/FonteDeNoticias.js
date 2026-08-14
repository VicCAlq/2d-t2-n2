
export class FonteDeNoticias {
  constructor(nome, endereco, descricao, categoria) {
    this.id = crypto.randomUUID()
    this.nome = nome
    this.endereco = endereco
    this.descricao = descricao
    this.categoria = categoria
  }

  static criarAPartirDeLink(link) {
    let nomeInferido = link
    try {
      const url = new URL(link.startsWith('http') ? link : `https://${link}`)
      nomeInferido = url.hostname.replace('www.', '')
    } catch {
      nomeInferido = link
    }

    return new FonteDeNoticias(
      nomeInferido,
      link,
      'Fonte cadastrada pelo usuário.',
      'Geral',
    )
  }
}
