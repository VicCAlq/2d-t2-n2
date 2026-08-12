function TabelaNoticias( {noticias} ) {

    return(
        <table>

            <thead>
                <tr>
                    <th>Matéria</th>
                    <th>Fonte</th>
                    <th>Categoria(s)</th>
                    <th>Link</th>
                    <th>Descrição</th>
                    <th>Data de Publicação</th>
                </tr>
            </thead>

            <tbody>
                {noticias.map((noticia) => (
                    <tr key={noticia.id}>
                        <td>{noticia.nome}</td>
                        <td>{noticia.fonte}</td>
                        <td>{noticia.categoria}</td>
                        <td>{noticia.endereco}</td>
                        <td>{noticia.descricao}</td>
                        <td>{noticia.dataDePublicacao}</td>
                    </tr>
                ))}
            </tbody>
            
        </table>
    )
}

export default TabelaNoticias
