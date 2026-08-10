import { useState } from "react";
 import {  connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia,
} from './database.js';
function PesquisaPorCategoria({ noticias, aoFiltrar }) {
    const [termo, setTermo] = useState("");

    async function pesquisaCategoria(valor) {
        setTermo(valor);

        const termoBusca = /*valor.*/ await filtrarNoticiasPorCategoria(valor);


        aoFiltrar(resultado);
    }

    async function opcoes (){
        
        

        aoFiltrar(resultado);
    }


    return (
        <select name="fonte" >
           <option value="">aaaaaaaa</option> 
        </select>

    );
    
}

export default PesquisaPorCategoria;