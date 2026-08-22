import { useState } from 'react';
import { FonteDeNoticia } from '../models/FonteDeNoticia';
import { baixarFeedRSS } from './leitorRSS';

export default function FormularioFonte({ onAdicionarFonte }) {
  const [endereco, setEndereco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    if (!endereco.trim()) {
      setErro('Informe um link válido.');
      return;
    }

    setCarregando(true);

    try {
      const feed = await baixarFeedRSS(endereco, categoria);

      const novaFonte = new FonteDeNoticia(
        feed.titulo,
        endereco,
        feed.descricao,
        categoria || 'Sem categoria'
      );

      const noticiasComFonte = feed.noticias.map((noticia) => {
        noticia.fonteNome = novaFonte.nome;
        return noticia;
      });

      onAdicionarFonte(novaFonte, noticiasComFonte);

      setEndereco('');
      setCategoria('');
    } catch (err) {
      setErro('Não foi possível carregar essa fonte. Verifique o link e tente novamente.');
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="endereco">Link da fonte (RSS/Atom)</label>
        <input
          id="endereco"
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="https://exemplo.com/rss"
          disabled={carregando}
        />
      </div>

      <div className="field">
        <label htmlFor="categoria">Categoria</label>
        <input
          id="categoria"
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Ex: Tecnologia, Esportes..."
          disabled={carregando}
        />
      </div>

      <button className="btn" type="submit" disabled={carregando}>
        {carregando ? 'Carregando...' : 'Adicionar fonte'}
      </button>

      {erro && <p className="error-text">{erro}</p>}
    </form>
  );
}