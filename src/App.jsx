import { useState } from "react";

import {
  adicionarNoticia,
  adicionarFonte,
  listarNoticias,
  listarFontes
} from "./components/database";

import { baixarFeedRSS } from "./components/leitorRSS";

import { Fonte, Noticia } from "./components/classes";

import TabelaNoticias from "./components/tabelaNoticias";

export default function App() {

  const [endereco, setEndereco] = useState("");
  const [filtroFonte, setFiltroFonte] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [noticiasExibidas, setNoticiasExibidas] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  async function carregarFeed() {
    await baixarFeedRSS(endereco)
    .then(async (resultado) => {
      
      const novaFonte = new Fonte(
        resultado.fonte.titulo,
        resultado.fonte.link,
        resultado.fonte.descricao,
        ""
      )

      await adicionarFonte(novaFonte)

      for (let noticia of resultado.noticias) {

        console.log(noticia.titulo, noticia.categorias)
        
        const novaNoticia = new Noticia(
          noticia.titulo,
          resultado.fonte.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        )

        await adicionarNoticia(novaNoticia)
      }

      await pegarNoticias()
      await pegarFontes()
    })
  }

  async function pegarNoticias() {
    const noticias = await listarNoticias()
    setNoticiasExibidas(noticias)

    const listaCategorias = [];

    for (const noticia of noticias) {

      console.log(noticia.categorias)

      for (const categoria of noticia.categorias) {

        if (!listaCategorias.includes(categoria)) {

          listaCategorias.push(categoria);
        }
      }
    }

    setCategorias(listaCategorias);
  }

  async function pegarFontes() {
    const fontes = await listarFontes();

    const fontesSemRepetir = [];

    for (const fonte of fontes) {

      const fonteEncontrada = fontesSemRepetir.find((item) => {
        return item.nome === fonte.nome
      })

      if (!fonteEncontrada) {
        fontesSemRepetir.push(fonte)
      }
    }

    setFontes(fontesSemRepetir);
  }

  async function aplicarFiltros(fonte, categoria) {
    let noticiasFiltradas = await listarNoticias()

    if (fonte !== "") {
      noticiasFiltradas = noticiasFiltradas.filter((noticia) => {
        return noticia.fonte === fonte
      })
    }

    if (categoria !== "") {
      noticiasFiltradas = noticiasFiltradas.filter((noticia) => {
        return noticia.categorias.includes(categoria)
      })
    }

    setNoticiasExibidas(noticiasFiltradas)
  }

  async function mudarFiltroFonte(e) {
    const novaFonte = e.target.value

    setFiltroFonte(novaFonte)
    await aplicarFiltros(novaFonte, filtroCategoria)
  }

  async function mudarFiltroCategoria(e) {
    const novaCategoria = e.target.value

    setFiltroCategoria(novaCategoria)

    await aplicarFiltros(filtroFonte, novaCategoria)
  }

  
  return (
      <div className= "app">

        <h1>Agregador de Notícias</h1>

        <div className="area-feed">
           <input 
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
        />

        <button onClick={() => carregarFeed()}>
          Clique para carregar o feed
        </button>

        </div>
       
        <div className="area-filtros">
           <select 
            value={filtroFonte} 
            onChange={mudarFiltroFonte}
           >
          <option value="">Todas as Fontes</option>

          {fontes.map((fonte) => (
            <option key={fonte.id} value={fonte.nome}>
              {fonte.nome}
            </option>
          ))}
        </select>

        <select 
        value={filtroCategoria}
        onChange={mudarFiltroCategoria}
        >
          <option value="">Todas as Categorias</option>

          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}

        </select>

        </div>
       

        <TabelaNoticias noticias={noticiasExibidas}/>

      </div>
  );
}