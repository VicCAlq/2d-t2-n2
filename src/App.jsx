import { useState } from "react";
import FormFonte from "./components/FormFonte";
import Filtros from "./components/Filtros";
import TabelaNoticias from "./components/TabelaNoticias";
import { baixarFeedRSS } from "./services/leitorRSS";
import Noticia from "./classes/Noticia";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [fonte, setFonte] = useState("");

  async function adicionarFonte(url) {
    try {
      const feed = await baixarFeedRSS(url);

      const listaNoticias = feed.noticias.map((item) => {
        return new Noticia(
          item.titulo,
          item.link,
          item.descricao,
          item.dataPublicacao,
          item.categorias?.join(", ") || "Sem categoria"
        );
      });

      setNoticias(listaNoticias);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao carregar o feed RSS.");
    }
  }

  const categorias = [...new Set(noticias.map((n) => n.categoria))];
  const fontes = ["RSS"];

  const noticiasFiltradas = noticias.filter((n) => {
    const categoriaOk = categoria === "" || n.categoria === categoria;
    const fonteOk = fonte === "" || fonte === "RSS";
    return categoriaOk && fonteOk;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Agregador de Notícias</h1>

      <FormFonte aoAdicionar={adicionarFonte} />

      <Filtros
        categorias={categorias}
        fontes={fontes}
        categoria={categoria}
        fonte={fonte}
        setCategoria={setCategoria}
        setFonte={setFonte}
      />

      <TabelaNoticias noticias={noticiasFiltradas} />
    </div>
  );
}
