import { useEffect, useMemo, useState } from 'react'
import FormularioFonte from './components/FormularioFonte'
import Filtros from './components/Filtros'
import TabelaNoticias from './components/TabelaNoticias'
import './App.css'
import { baixarFeedRSS } from './components/leitorRSS'
import { adicionarFonte, adicionarNoticia, listarFontes, listarNoticias, removerTodasFontes } from './components/database'

function App() {
  const [fontes, setFontes] = useState([])
  const [noticias, setNoticias] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('TODAS')
  const [fonteSelecionada, setFonteSelecionada] = useState('TODAS')

  // Ao montar, carrega tudo do IndexedDB. Se o banco estiver vazio (primeira
  // vez, ou banco limpo), o app simplesmente começa sem nenhuma fonte/notícia
  // cadastrada — não depende mais de nenhum arquivo de dados iniciais.
  useEffect(() => {
    async function carregarDados() {
      const [fontesSalvas, noticiasSalvas] = await Promise.all([
        listarFontes(),
        listarNoticias(),
      ])
      setFontes(fontesSalvas)
      setNoticias(noticiasSalvas)
    }

    carregarDados()
  }, [])

  // Recebe o link digitado e a categoria escolhida no formulário.
  // Busca o feed (fetch async), salva a fonte e as notícias no IndexedDB.
  async function cadastrarFeed(link, categoria) {
    const resultado = await baixarFeedRSS(link)

    const novaFonte = {
      nome: resultado.titulo || link,
      endereco: resultado.link || link,
      descricao: resultado.descricao || 'Fonte cadastrada pelo usuário.',
      categoria,
    }

    const idFonte = await adicionarFonte(novaFonte)
    const fonteSalva = { ...novaFonte, id: idFonte }
    setFontes((atual) => [...atual, fonteSalva])

    const novasNoticias = []
    for (const item of resultado.noticias) {
      const noticia = {
        nome: item.titulo,
        endereco: item.link,
        descricao: item.descricao,
        dataDePublicacao: item.dataPublicacao,
        categoria: item.categorias?.[0] || categoria,
        fonteNome: fonteSalva.nome,
      }
      const idNoticia = await adicionarNoticia(noticia)
      novasNoticias.push({ ...noticia, id: idNoticia })
    }
    setNoticias((atual) => [...atual, ...novasNoticias])
  }

  // Apaga todas as fontes (e as notícias associadas a elas) do IndexedDB.
  async function handleExcluirTodasFontes() {
    const confirmou = window.confirm(
      'Tem certeza que quer excluir TODAS as fontes cadastradas? Isso também vai apagar as notícias delas. Essa ação não pode ser desfeita.',
    )
    if (!confirmou) return

    await removerTodasFontes()
    setFontes([])
    setNoticias([])
    setFonteSelecionada('TODAS')
  }

  const categorias = useMemo(
    () => [...new Set(noticias.map((n) => n.categoria))],
    [noticias],
  )

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
        <FormularioFonte aoAdicionarFonte={cadastrarFeed} />

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
        {fontes.length > 0 && (
          <button
            type="button"
            className="botao-excluir-fontes"
            onClick={handleExcluirTodasFontes}
          >
            Excluir todas as fontes
          </button>
        )}
      </footer>
    </div>
  )
}

export default App
