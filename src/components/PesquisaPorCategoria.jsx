import { filtrarNoticiasPorCategoria } from './database.js';
/*SLA*/
function PesquisaPorCategoria({ noticias, aoFiltrar, todasNoticias }) {

    const listaCategoriasTratadas = todasNoticias.map((noticia) => {
        if (!noticia.categorias || noticia.categorias.length === 0) {
            return 'sem categoria';
        }
        
        return Array.isArray(noticia.categorias) 
            ? noticia.categorias.join(', ') 
            : noticia.categorias;
    });

    const categoriasUnicas = [...new Set(listaCategoriasTratadas)];

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
