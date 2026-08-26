export default function Filtros({
  categorias,
  fontes,
  categoriaSelecionada,
  fonteSelecionada,
  aoMudarCategoria,
  aoMudarFonte,
}) {
  return (
    <div className="barra-filtros">
      <div className="seletor">
        <label htmlFor="filtro-categoria">Categoria</label>
        <select
          id="filtro-categoria"
          value={categoriaSelecionada}
          onChange={(e) => aoMudarCategoria(e.target.value)}
        >
          <option value="TODAS">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="seletor">
        <label htmlFor="filtro-fonte">Fonte</label>
        <select
          id="filtro-fonte"
          value={fonteSelecionada}
          onChange={(e) => aoMudarFonte(e.target.value)}
        >
          <option value="TODAS">Todas as fontes</option>
          {fontes.map((fonte) => (
            <option key={fonte.id} value={fonte.nome}>
              {fonte.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}