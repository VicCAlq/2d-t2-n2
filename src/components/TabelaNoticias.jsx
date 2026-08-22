import { useState } from "react";
import { corDaCategoria } from "../cores";

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
      <div className="filter-bar">
        <div className="filter-field">
          <label htmlFor="filtro-categoria">Categoria</label>
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

        <div className="filter-field">
          <label htmlFor="filtro-fonte">Fonte</label>
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

      <table className="wire-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {noticiasFiltradas.length === 0 ? (
            <tr>
              <td className="empty-row" colSpan="4">
                Nenhuma notícia encontrada.
              </td>
            </tr>
          ) : (
            noticiasFiltradas.map((noticia, i) => {
              const cor = corDaCategoria(noticia.categoria);
              return (
                <tr key={i}>
                  <td>{noticia.nome}</td>
                  <td>
                    <span className="pill" style={{ background: cor.bg, color: cor.texto }}>
                      {noticia.categoria}
                    </span>
                  </td>
                  <td className="mono">
                    {new Date(noticia.dataDePublicacao).toLocaleString("pt-BR")}
                  </td>
                  <td>
                    <a href={noticia.endereco} target="_blank" rel="noopener noreferrer">
                      Acessar
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}