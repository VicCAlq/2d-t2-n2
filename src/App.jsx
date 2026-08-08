import AdicionarRSS from "./components/AdicionarRSS";
import PesquisaPorCategoria from "./components/PesquisaPorCategoria"
import TabelaDeNoticias from "./components/TabelaDeNoticias";
import { useState } from "react";

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

  function atualizaFeed(novasNoticias) {
    setFeed(novasNoticias);
    setNoticiasFiltradas(novasNoticias);
  }

  return (
    <div style={styles.container}>
      <h1>Crie seu aplicativo React aqui</h1>
      <PesquisaPorCategoria
        noticias={feed}
        aoFiltrar={(resultado) => setNoticiasFiltradas(resultado)}
      />
      <AdicionarRSS setFeed={atualizaFeed} setFonte={setFonte}/>
      <TabelaDeNoticias noticias={noticiasFiltradas} fonte={fonte} />
    </div>
  );
}
