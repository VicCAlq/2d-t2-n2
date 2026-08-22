import { useState } from "react";
import FormularioFonte from "./components/FormularioFonte";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eec",
    padding: "20px",
  },
  title: {
    color: "#101015"
  }
};

export default function App() {
  const [fontes, setFontes] = useState([]);
  const [noticias, setNoticias] = useState([]);

  function handleAdicionarFonte(novaFonte, novasNoticias) {
    setFontes((prev) => [...prev, novaFonte]);
    setNoticias((prev) => [...prev, ...novasNoticias]);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agregador de Notícias</h1>

      <FormularioFonte onAdicionarFonte={handleAdicionarFonte} />

      <h2>Fontes cadastradas ({fontes.length})</h2>
      <ul>
        {fontes.map((fonte, i) => (
          <li key={i}>
            <strong>{fonte.nome}</strong> — {fonte.categoria} ({fonte.endereco})
          </li>
        ))}
      </ul>

      <h2>Notícias ({noticias.length})</h2>
      {/* Provisório: no passo 3 isso vira uma tabela com filtros */}
      <ul>
        {noticias.map((noticia, i) => (
          <li key={i}>
            <strong>{noticia.nome}</strong> — {noticia.categoria} — {noticia.dataDePublicacao}
          </li>
        ))}
      </ul>
    </div>
  );
}