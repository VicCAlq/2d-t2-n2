export function TabelaNoticias({ noticias }) {
  return (
    <div>
      <h2>Notícias</h2>
      <table className="tabela-noticias">
        <thead>
          <tr>
            <th>Notícia</th>
            <th>Descrição</th>
            <th>Data de publicação</th>
            <th>Categoria</th>
            <th>Fonte</th>
          </tr>
        </thead>
        <tbody>
          {noticias.length === 0 ? (
            <tr>
              <td colSpan="5">
                Nenhuma notícia encontrada.
              </td>
            </tr>
          ) : (
            noticias.map((noticia) => (
              <tr key={noticia.id}>
                <td>
                  <a href={noticia.endereco} target="_blank" rel="noreferrer">
                    {noticia.nome}
                  </a>
                </td>
                <td>
                  {noticia.descricao || "Sem descrição"}
                </td>
                <td>
                  {noticia.dataDePublicacao || "Sem data"}
                </td>
                <td>
                  {noticia.categoria || "Sem categoria"}
                </td>
                <td>
                  {noticia.fonte || "Não informada"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
