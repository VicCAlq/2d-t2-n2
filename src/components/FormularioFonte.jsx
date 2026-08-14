import { useState } from 'react'
import { FonteDeNoticias } from '../models/FonteDeNoticias'

export default function FormularioFonte({ aoAdicionarFonte }) {
  const [link, setLink] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const valor = link.trim()

    if (!valor) {
      setErro('Cola um link aí.')
      return
    }

    const novaFonte = FonteDeNoticias.criarAPartirDeLink(valor)
    aoAdicionarFonte(novaFonte)
    setLink('')
    setErro('')
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
          />
          <button type="submit">Adicionar</button>
        </div>
        {erro && <p className="form-fonte__erro">{erro}</p>}
      </form>
    </section>
  )
}

