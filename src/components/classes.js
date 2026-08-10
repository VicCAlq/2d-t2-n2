class Fonte {
    constructor(nome, endereco, descricao, categoria)

    {
        this.nome = nome
        this.endereco = endereco
        this.descricao = descricao
        this.categoria = categoria
    }
   
}

class Noticia {
    constructor(nome, fonte, endereco, descricao, dataDePublicacao, categoria)

    {
        this.nome = nome
        this.fonte = fonte
        this.endereco = endereco
        this.descricao = descricao
        this.dataDePublicacao = dataDePublicacao
        this.categoria = categoria
    }

}

export {
    Fonte, Noticia
}