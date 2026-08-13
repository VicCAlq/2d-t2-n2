/*import { useState } from "react";
import {   connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia, } from './database.js';

function PesquisaPorFonte({ noticias, aoFiltrar , todasFontes }) {
    const [termo, setTermo] = useState("");

    function pesquisaFonte(valor) {
        setTermo(valor);

        const termoBusca =filtrarNoticiasPorFonte(valor) ;

        const resultado = noticias.filter((noticia) =>
            noticia.fonte?.toLowerCase().includes(termoBusca)
        );

        aoFiltrar(termoBusca);
    }
  return(<>
        <select>
            {todasFontes.map((fonte) => {
                return <option 
                    value={fonte.nome}
                    onSelect={() => filtrarNoticiasPorFonte(fonte.nome)}
                >{fonte.nome}</option>
            })}
        </select>
    </>)
}

export default PesquisaPorFonte;*/
import { useState } from "react";
import { filtrarNoticiasPorFonte } from './database.js';

function PesquisaPorFonte({ noticias, aoFiltrar, todasFontes, setFonte }) {
    const [termo, setTermo] = useState("");

    return(<>
        <select
          defaultValue=""
          onChange={async (e) => {
            const valor = e.target.value;
            if (!valor) {
              aoFiltrar(noticias);
              setFonte(null);
              return;
            }
            const resultado = await filtrarNoticiasPorFonte(valor);
            const fonteObjeto = todasFontes.find(fonte => fonte.nome === valor);
            setFonte(fonteObjeto);
            aoFiltrar(resultado);
          }}
        >
          <option value="" disabled>Selecione uma fonte</option>
          {todasFontes.map((fonte) => (
            <option key={fonte.id} value={fonte.nome}>{fonte.nome}</option>
          ))}
        </select>
    </>)
}

export default PesquisaPorFonte;