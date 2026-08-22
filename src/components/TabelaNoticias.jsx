import { useState } from "react";

export default function TabelaNoticias({ noticias, fontes }) {
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroFonte, setFiltroFonte] = useState("todas");

  const categorias = [];
  const categoriasMinusculas = [];
  for (let i = 0; i < noticias.length; i++) {
    const cat = noticias[i].categoria;
    if (cat && !categoriasMinusculas.includes(cat.toLowerCase())) {
      categorias.push(cat);
      categoriasMinusculas.push(cat.toLowerCase());
    }
  }

  const nomesFontes = [];
  for (let i = 0; i < fontes.length; i++) {
    if (fontes[i].nome && !nomesFontes.includes(fontes[i].nome)) {
      nomesFontes.push(fontes[i].nome);
    }
  }

  const noticiasFiltradas = noticias.filter((noticia) => {
    const passaCategoria =
      filtroCategoria === "todas" ||
      (noticia.categoria && noticia.categoria.toLowerCase() === filtroCategoria.toLowerCase());
    const passaFonte = filtroFonte === "todas" || noticia.fonteNome === filtroFonte;
    return passaCategoria && passaFonte;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <div>
          <label htmlFor="filtro-categoria">Categoria: </label>
          <select
            id="filtro-categoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="todas">Todas</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-fonte">Fonte: </label>
          <select
            id="filtro-fonte"
            value={filtroFonte}
            onChange={(e) => setFiltroFonte(e.target.value)}
          >
            <option value="todas">Todas</option>
            {nomesFontes.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Data de Publicação</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {noticiasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Nenhuma notícia encontrada.
              </td>
            </tr>
          ) : (
            noticiasFiltradas.map((noticia, i) => (
              <tr key={i}>
                <td>{noticia.nome}</td>
                <td>{noticia.categoria}</td>
                <td>{new Date(noticia.dataDePublicacao).toLocaleString("pt-BR")}</td>
                <td>
                  <a href={noticia.endereco} target="_blank" rel="noopener noreferrer">
                    Acessar
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}