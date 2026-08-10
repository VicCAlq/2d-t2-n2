import Exemplo from "./components/Exemplo";
import { Fonte, Noticia } from './components/classes'

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

  async function carregarFeed() {
    await baixarFeedRSS(endereco)
    .then(async (resultado) => {
      
      const novaFonte = new Fonte(
        resultado.fonte.nome,
        resultado.fonte.enderco,
        resultado.fonte.descricao,
        resultado.fonte.categoria,
      )

      await adicionarFonte(novaFonte)

      for (let noticia of resultado.noticias) {
        const novaNoticia = new Noticia(
          noticia.titulo,
          resultado.fonte.titulo,
          noticia.link,
        )

        await adicionarNoticia(novaNoticia)
      }
    })
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

    </div>
  );
}
