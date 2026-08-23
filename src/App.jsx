import { useEffect, useState } from "react";
import { Formulario } from "./components/formulario";
import { FiltrosNoticias } from "./components/FiltrosNoticias";
import { TabelaNoticias } from "./components/TabelaNoticias";
import {listarNoticias,listarFontes} from "./components/database";
export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [fonteSelecionada, setFonteSelecionada] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");
      const noticiasDoBanco = await listarNoticias();
      const fontesDoBanco = await listarFontes();
      setNoticias(noticiasDoBanco);
      setFontes(fontesDoBanco);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os dados do banco.");
    } finally {setCarregando(false);}
  }
  useEffect(() => {carregarDados();}, []);
  const noticiasFiltradas = noticias.filter((noticia) => {
    const correspondeCategoria = categoriaSelecionada === "" || noticia.categoria === categoriaSelecionada;
    const correspondeFonte = fonteSelecionada === "" || noticia.fonte === fonteSelecionada;
    return correspondeCategoria && correspondeFonte;
  });
  function limparFiltros() {setCategoriaSelecionada(""); setFonteSelecionada("");}
  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Agregador de Notícias</h1>
        <p>
          Adicione fontes de notícias e acompanhe
          suas notícias em um só lugar.
        </p>
      </header>
      <main className="conteudo">
        <section className="secao">
          <Formulario
            onFonteAdicionada={carregarDados}
          />
        </section>
        <section className="secao">
          <h2>Filtros</h2>
          <FiltrosNoticias noticias={noticias} categoriaSelecionada={categoriaSelecionada} setCategoriaSelecionada={setCategoriaSelecionada} fonteSelecionada={fonteSelecionada} setFonteSelecionada={setFonteSelecionada}/>
          <button className="botao-limpar" type="button" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </section>
        <section className="secao">
          {carregando ? (
            <p>Carregando notícias...</p>
          ) : erro ? (
            <p className="mensagem-erro">{erro}</p>
          ) : (
            <>
            <p className="contador"> Notícias encontradas: {noticiasFiltradas.length}</p>
              <TabelaNoticias
                noticias={noticiasFiltradas}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}