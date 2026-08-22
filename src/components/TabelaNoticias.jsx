import { formatarDataDePublicacao } from '../models/Noticia'

export default function TabelaNoticias({ noticias }) {
  if (noticias.length === 0) {
    return (
      <div className="tabela-vazia">
        <p>Isso aí ta tendo não manzinho</p>
      </div>
    )
  }

  return (
    <div className="tabela-wrapper">
      <table className="tabela-noticias">
        <thead>
          <tr>
            <th>Manchete</th>
            <th>Categoria</th>
            <th>Fonte</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>
                <a
                  className="manchete-link"
                  href={
                    noticia.endereco.startsWith('http')
                      ? noticia.endereco
                      : `https://${noticia.endereco}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {noticia.nome}
                </a>
                <p className="manchete-descricao">{noticia.descricao}</p>
              </td>
              <td>
                <span className="selo-categoria">{noticia.categoria}</span>
              </td>
              <td className="celula-fonte">{noticia.fonteNome}</td>
              <td className="celula-data">{formatarDataDePublicacao(noticia.dataDePublicacao)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
