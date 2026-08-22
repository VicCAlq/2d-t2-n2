import { useState } from 'react'

const CATEGORIAS_DISPONIVEIS = ['Geral', 'Revista', 'TV', 'Zine', 'Blog', 'Jornal', 'Podcast']

export default function FormularioFonte({ aoAdicionarFonte }) {
  const [link, setLink] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIAS_DISPONIVEIS[0])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const valor = link.trim()

    if (!valor) {
      setErro('Cola um link aí.')
      return
    }

    setErro('')
    setCarregando(true)
    try {
      // aoAdicionarFonte é async: busca o feed RSS (fetch) e salva fonte + notícias no IndexedDB
      await aoAdicionarFonte(valor, categoria)
      setLink('')
      setCategoria(CATEGORIAS_DISPONIVEIS[0])
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar essa fonte. Confere o link e tenta de novo.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <section className="painel-classificados">
      <div className="painel-classificados__cabecalho">
        <span className="selo-manual">Adicione Sua Notícia</span>
        <h2>Cadastrar Fonte</h2>
      </div>
      <form className="form-fonte" onSubmit={handleSubmit}>
        <label htmlFor="link-fonte">Link da fonte de notícias</label>
        <div className="form-fonte__linha">
          <input
            id="link-fonte"
            type="text"
            placeholder="ex: BornerNews.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={carregando}
          />

          <label htmlFor="categoria-fonte" className="form-fonte__label-inline">
            Categoria
          </label>
          <select
            id="categoria-fonte"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            disabled={carregando}
          >
            {CATEGORIAS_DISPONIVEIS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button type="submit" disabled={carregando}>
            {carregando ? 'Carregando...' : 'Adicionar'}
          </button>
        </div>
        {erro && <p className="form-fonte__erro">{erro}</p>}
      </form>
    </section>
  )
}
