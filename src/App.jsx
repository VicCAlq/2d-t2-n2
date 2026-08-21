import { useEffect, useState } from "react";
import FormFonte from "./components/FormFonte";
import Filtros from "./components/Filtros";
import TabelaNoticias from "./components/TabelaNoticias";
import { baixarFeedRSS } from "./services/leitorRSS";
import Noticia from "./classes/Noticia";
import FonteDeNoticias from "./classes/FonteDeNoticias";
import "./App.css";

import {
  adicionarFonte,
  listarFontes,
  adicionarNoticia,
  listarNoticias,
} from "./services/database";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [fonte, setFonte] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const noticiasSalvas = await listarNoticias();
        const fontesSalvas = await listarFontes();

        setNoticias(noticiasSalvas);
        setFontes(fontesSalvas);
      } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
      }
    }

    carregarDados();
  }, []);

  async function adicionarNovaFonte(url) {
    try {
      const feed = await baixarFeedRSS(url);

      const novaFonte = new FonteDeNoticias(
        feed.titulo || "Fonte RSS",
        url,
        feed.descricao || "",
        "RSS"
      );

      const idFonte = await adicionarFonte(novaFonte);

      novaFonte.id = idFonte;

      setFontes((fontesAnteriores) => [
        ...fontesAnteriores,
        novaFonte,
      ]);

      const listaNoticias = feed.noticias.map((item) => {
        return new Noticia(
          item.titulo,
          feed.titulo,
          item.link,
          item.descricao,
          item.dataPublicacao,
          item.categorias?.join(", ") || "Sem categoria"
        );
      });

      for (const noticia of listaNoticias) {
        await adicionarNoticia(noticia);
      }

      const noticiasAtualizadas = await listarNoticias();

      setNoticias(noticiasAtualizadas);
    } catch (erro) {
      console.error("Erro ao carregar e salvar o feed RSS:", erro);
      alert("Erro ao carregar e salvar o feed RSS.");
    }
  }

  const categorias = [
    ...new Set(
      noticias.map((noticia) => noticia.categoria)
    ),
  ];

  const nomesFontes = fontes.map(
    (fonte) => fonte.nome
  );

  const noticiasFiltradas = noticias.filter((noticia) => {
    const categoriaOk =
      categoria === "" ||
      noticia.categoria === categoria;

    const fonteOk =
      fonte === "" ||
      noticia.fonte === fonte;

    return categoriaOk && fonteOk;
  });

  return (
    <div className="app">
      <h1>Agregador de Notícias</h1>

      <FormFonte aoAdicionar={adicionarNovaFonte} />

      <Filtros
        categorias={categorias}
        fontes={nomesFontes}
        categoria={categoria}
        fonte={fonte}
        setCategoria={setCategoria}
        setFonte={setFonte}
      />

      <TabelaNoticias noticias={noticiasFiltradas} />
    </div>
  );
}
