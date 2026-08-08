export default function TabelaDeNoticias({ noticias,fonte }) {
    return (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Matéria</th>
                    <th>Fonte</th>
                    <th>Descrição</th>
                    <th>Link</th>
                    <th>Data de Publicação</th>
                </tr>
            </thead>
            <tbody>
                {noticias.map((noticia, index) => (
                    <tr key={index} style={{ backgroundColor: "#7ab" }}>
                        <td>{noticia.titulo}</td>
                        <td>{fonte?.titulo || noticia.fonte || 'Sem fonte'}</td>
                        <td>{noticia.descricao}</td>
                        <td>
                            <a href={noticia.link} target="_blank" rel="noopener noreferrer">
                                {noticia.link}
                            </a>
                        </td>
                        <td>{noticia.dataPublicacao}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}