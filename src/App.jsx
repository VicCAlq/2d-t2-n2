import Exemplo from "./components/Exemplo";
import Noticia from "./components/Noticias";
import FonteDeNoticias from "./components/FonteDeNoticias";
import TabelaLinda from "./components/TabelaLinda";
import Fetch from "./components/Fetch";
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
  return (
    <div style={styles.container}>
      <h1>Crie seu aplicativo React aqui</h1>
      <Fetch></Fetch>
      <TabelaLinda></TabelaLinda>
      <Exemplo>Componente de exemplo aqui</Exemplo>
    </div>
  );
}
