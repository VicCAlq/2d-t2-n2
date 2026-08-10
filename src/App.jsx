import Exemplo from "./components/Exemplo";

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
    const resultado = await baixarFeedRSS(endereco)
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
