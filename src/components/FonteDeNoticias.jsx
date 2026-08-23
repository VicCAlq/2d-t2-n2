class FonteDeNoticias {
  constructor(nome, endereco, descricao, categoria) {
    if (
      typeof nome !== "string" ||
      typeof endereco !== "string" ||
      typeof descricao !== "string" ||
      typeof categoria !== "string"
    ) {
      console.log(`Os dados informados não estão no formato correto:nome: texto, endereço: texto,descrição: texto, categoria: texto`);
      return;
}
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

const fontesNoticia = [];

function adicionarFonteNoticia(nome,endereco,descricao,categoria) {
  const fonte = new FonteDeNoticias(nome,endereco,descricao,categoria);
  if (fonte.nome !== undefined) {
    fontesNoticia.push(fonte);}
return fonte;
}
export {FonteDeNoticias,fontesNoticia,adicionarFonteNoticia};