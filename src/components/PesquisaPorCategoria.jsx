import { useState } from "react";
import { filtrarNoticiasPorCategoria } from './database.js';

function PesquisaPorCategoria({ noticias, aoFiltrar , todasNoticias }) {
    const [termo, setTermo] = useState("");

    

    return(<>
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
          {todasNoticias.map((noticia, index) => {
            let categoria = 'sem categoria';
            if (noticia.categorias && noticia.categorias.length) {
                categoria = noticia.categorias;
            }
            
            let valor = categoria;
            if (Array.isArray(categoria)) {
                valor = categoria.join(', ');
            }
            
            if (!valor || valor === 'sem categoria') {
                return (
                  
                    <option key={`sem-categoria-${index}`} value="sem categoria">
                  sem categoria
                </option>
              );
            } else {
              return (
                <option key={`${valor}-${index}`} value={valor}>
                  {valor}
                </option>
              );
            }
          })}
        </select>
    </>)
}

export default PesquisaPorCategoria;