import AdicionarRSS from "./components/AdicionarRSS";
import Exemplo from "./components/Exemplo";
import { useState } from "react";
import TabelaDeNoticias from "./components/TabelaDeNoticias";

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
  
  const [feed, setFeed] = useState()
  const [tabelaExibida, setTabelaExibida] = useState()



  return (
    <div style={styles.container}>
      <h1>Crie seu aplicativo React aqui</h1>
      <Exemplo setFeed={setFeed}>Componente de exemplo aqui</Exemplo>
      <AdicionarRSS setFeed={setFeed}/>
      <TabelaDeNoticias feed={feed}/>
    </div>
  );
}
