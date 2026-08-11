import { useState } from "react";

import {
  adicionarNoticia,
  adicionarFonte,
  listarNoticias
} from "./components/database";

import { baixarFeedRSS } from "./components/leitorRSS";

import { Fonte, Noticia } from "./components/classes";

import TabelaNoticias from "./components/tabelaNoticias";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eec",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#101015"
  }
};

export default function App() {

  const [endereco, setEndereco] = useState("");
  //const [filtroFonte, setFiltroFonte] = useState("");
  //const [filtroCategoria, setFiltroCategoria] = useState("");
  const [noticiasExibidas, setNoticiasExibidas] = useState([]);
 // mesma coisa pra categoria
 // Mesma coisa pra notícias exibidas

  async function carregarFeed() {
    await baixarFeedRSS(endereco)
    .then(async (resultado) => {
      
      const novaFonte = new Fonte(
        resultado.fonte.titulo,
        resultado.fonte.link,
        resultado.fonte.descricao,
        ""
      )

      await adicionarFonte(novaFonte)

      for (let noticia of resultado.noticias) {
        const novaNoticia = new Noticia(
          noticia.titulo,
          resultado.fonte.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        )

        await adicionarNoticia(novaNoticia)
      }

      await pegarNoticias()
    })
  }

  async function pegarNoticias() {
    const noticias = await listarNoticias()
    setNoticiasExibidas(noticias)
  }

  
  return (
      <div style={styles.container}>

        <input 
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
        />

        <button onClick={() => carregarFeed()}>
          Clique para carregar o feed
        </button>

        <TabelaNoticias noticias={noticiasExibidas}/>

      </div>
  );
}

