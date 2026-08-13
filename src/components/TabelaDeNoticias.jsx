export default function TabelaDeNoticias({ noticias,fonte }) {
    return (
        <div style={{ overflowX: "auto", width: "100%" }}>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", minWidth: "900px" }}>
                <thead>
                    <tr>
                        <th>Matéria</th>
                        <th>Fonte</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Link</th>
                        <th>Data de Publicação</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((noticia, index) => (
                        <tr key={index} style={{ backgroundColor: "#7ab" }}>
                            <td>{noticia.titulo || noticia.nome}</td>
                            <td>{fonte?.titulo || noticia.fonte || 'Sem fonte'}</td>
                            <td>{(Array.isArray(noticia.categorias) ? noticia.categorias.join(', ') : noticia.categorias) || 'Sem categoria'}</td>
                            <td>{noticia.descricao}</td>
                            <td>
                                <a href={noticia.link || noticia.endereco} target="_blank" rel="noopener noreferrer">
                                    {noticia.link || noticia.endereco || 'Sem link'}
                                </a>
                            </td>
                            <td>{noticia.dataPublicacao || noticia.dataDePublicacao || 'Sem data'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}