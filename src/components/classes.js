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
    constructor(nome, fonte, endereco, descricao, dataDePublicacao, categorias)

    {
        this.nome = nome
        this.fonte = fonte
        this.endereco = endereco
        this.descricao = descricao
        this.dataDePublicacao = dataDePublicacao
        this.categorias = categorias
    }

}

export {
    Fonte, Noticia
}
