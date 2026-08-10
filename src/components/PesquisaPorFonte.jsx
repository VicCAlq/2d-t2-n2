import { useState } from "react";
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

    /*function pesquisaFonte(valor) {
        setTermo(valor);

        const termoBusca =filtrarNoticiasPorFonte(valor) ;

        const resultado = noticias.filter((noticia) =>
            noticia.fonte?.toLowerCase().includes(termoBusca)
        );

        aoFiltrar(termoBusca);
    }*/
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

export default PesquisaPorFonte;