import AdicionarRSS from "./components/AdicionarRSS";
import PesquisaPorCategoria from "./components/PesquisaPorCategoria"
import TabelaDeNoticias from "./components/TabelaDeNoticias";
import PesquisaPorFonte from "./components/PesquisaPorFonte"
import { useState } from "react";
import {
  connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia,
} from './components/database'

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

  const [feed, setFeed] = useState([]);
  const [fonte, setFonte] = useState(null);
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [todasNoticias, setTodasNoticias] = useState([])
  const [todasFontes, setTodasFontes] = useState([])

  async function carregarTodasNoticias() {
    const noticias = await listarNoticias()
    setTodasNoticias(noticias)
  }

    async function carregarTodasFontes() {
    const fontes = await listarNoticias()
    setTodasFontes(noticias)
  }

  function atualizaFeed(novasNoticias) {
    setFeed(novasNoticias);
    setNoticiasFiltradas(novasNoticias);
  }

  function listaCategorias () { return [...new Set(todasNoticias.map(noticia => { return noticia.categorias }))] }


   function listaFontes() { return [...new Set(todasFontes.map(fonte => { return fonte.titulo }))] }

   return (
    <div style={styles.container}>
      <h1>Crie seu aplicativo React aqui</h1>

      <PesquisaPorCategoria
        noticias={feed}
        aoFiltrar={(resultado) => setNoticiasFiltradas(resultado)}
      />


      <PesquisaPorFonte
      noticias={feed}
      aoFiltrar={(resultado) => setNoticiasFiltradas(resultado)}
      todasFontes={todasFontes}
      />
      
      <AdicionarRSS setFeed={atualizaFeed} setFonte={setFonte}/>

      <TabelaDeNoticias noticias={noticiasFiltradas} fonte={fonte} />
      
    </div>
  );
}
