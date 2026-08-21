import { filtrarNoticiasPorCategoria } from './database.js';
/*SLA*/
function PesquisaPorCategoria({ noticias, aoFiltrar, todasNoticias }) {

    let categorias = noticias.map(noticia => noticia.categorias)
    categorias = categorias.flat()
    let categoriasUnicas = [ ... new Set(categorias) ]

    return (
        <>
            <select
              defaultValue=""
              onChange={async (e) => {
                const valor = e.target.value;
                if (!valor) {
                  aoFiltrar(noticias);
                  return;
                }
                const resultado = await filtrarNoticiasPorCategoria(valor);
                aoFiltrar(resultado);
              }}
            >
              <option value="" disabled>Selecione uma Categoria</option>
              
              {categoriasUnicas.map((categoria, index) => (
                <option key={`${categoria}-${index}`} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
        </>
    );
}

export default PesquisaPorCategoria;
