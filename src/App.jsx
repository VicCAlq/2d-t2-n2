import { useMemo, useState } from 'react'
import FormularioFonte from './components/FormularioFonte'
import Filtros from './components/Filtros'
import TabelaNoticias from './components/TabelaNoticias'
import { fontesIniciais, noticiasIniciais } from './data/seedData'
import './App.css'

function App() {
  const [fontes, setFontes] = useState(fontesIniciais)
  const [noticias] = useState(noticiasIniciais)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('TODAS')
  const [fonteSelecionada, setFonteSelecionada] = useState('TODAS')

  const categorias = useMemo(
    () => [...new Set(noticias.map((n) => n.categoria))],
    [noticias],
  )

  function handleAdicionarFonte(novaFonte) {
    setFontes((atual) => [...atual, novaFonte])
  }

  const noticiasFiltradas = useMemo(() => {
    return noticias.filter((noticia) => {
      const passaCategoria =
        categoriaSelecionada === 'TODAS' || noticia.categoria === categoriaSelecionada
      const passaFonte =
        fonteSelecionada === 'TODAS' || noticia.fonteNome === fonteSelecionada
      return passaCategoria && passaFonte
    })
  }, [noticias, categoriaSelecionada, fonteSelecionada])

  const dataDeHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="pagina">
      <header className="masthead">
        <p className="masthead__linha-topo">
          <span>EDIÇÃO ESPECIAL</span>
          <span>{dataDeHoje}</span>
        </p>
        <h1 className="masthead__titulo">Menor Quentes News</h1>
        <p className="masthead__subtitulo">
          Só Notícia quente de cria
        </p>
        <div className="masthead__linha-dupla" aria-hidden="true" />
      </header>

      <main className="conteudo">
        <FormularioFonte aoAdicionarFonte={handleAdicionarFonte} />

        <section className="secao-noticias">
          <div className="secao-noticias__cabecalho">
            <h2>Últimas do Mural</h2>
            <span className="selo-manual selo-manual--vermelho">
              {noticiasFiltradas.length} MANCHETE(S)
            </span>
          </div>

          <Filtros
            categorias={categorias}
            fontes={fontes}
            categoriaSelecionada={categoriaSelecionada}
            fonteSelecionada={fonteSelecionada}
            aoMudarCategoria={setCategoriaSelecionada}
            aoMudarFonte={setFonteSelecionada}
          />

          <TabelaNoticias noticias={noticiasFiltradas} />
        </section>
      </main>

      <footer className="rodape">
        <p>Fontes cadastradas: {fontes.map((f) => f.nome).join(' • ')}</p>
      </footer>
    </div>
  )
}

export default App
