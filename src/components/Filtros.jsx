export default function Filtros({
  categorias,
  fontes,
  categoria,
  fonte,
  setCategoria,
  setFonte
}) {
  return (
    <div>

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Todas as categorias</option>

        {categorias.map((cat) => (
          <option key={cat}>
            {cat}
          </option>
        ))}

      </select>

      <select
        value={fonte}
        onChange={(e) => setFonte(e.target.value)}
      >
        <option value="">Todas as fontes</option>

        {fontes.map((fonte) => (
          <option key={fonte}>
            {fonte}
          </option>
        ))}

      </select>

    </div>
  );
}