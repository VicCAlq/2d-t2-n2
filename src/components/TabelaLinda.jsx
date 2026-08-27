
export default function TabelaNoticias({ noticias }) {
return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>

        {noticias.map((noticia, index) => (

          <tr key={index}>

            <td>{noticia.nome}</td>

            <td>{noticia.categoria}</td>

            <td>{noticia.dataDePublicacao}</td>

            <td>

              <a
                href={noticia.endereco}
                target="_blank"
                rel="noreferrer"
              >
                Abrir
              </a>

            </td>

          </tr>

        ))}
      </tbody>
    </table>
  );
}

