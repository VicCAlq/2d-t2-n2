export function FiltrosNoticias({noticias,categoriaSelecionada,setCategoriaSelecionada,fonteSelecionada,setFonteSelecionada}) {
  const categorias = [...new Set(noticias.map((noticia) => noticia.categoria).filter(Boolean))];
  const fontes = [...new Set(noticias.map((noticia) => noticia.fonte).filter(Boolean))];
  return (
    <div className="filtros">
      <div className="filtro">
        <label htmlFor="filtro-categoria">
          Filtrar por categoria:
        </label>
        <select id="filtro-categoria" value={categoriaSelecionada} onChange={(event) => setCategoriaSelecionada(event.target.value)}>
          <option value="">Todas as categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro">
        <label htmlFor="filtro-fonte">
          Filtrar por fonte:
        </label>
        <select id="filtro-fonte" value={fonteSelecionada} onChange={(event) => setFonteSelecionada(event.target.value)}>
          <option value="">Todas as fontes</option>
          {fontes.map((fonte) => (
            <option key={fonte} value={fonte}>
              {fonte}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
