import { useState } from 'react';
import { baixarFeedRSS } from "./leitorRSS";


export default function FormularioNovaFonte({ onAdicionarFonte }) {
  const [url, setUrl] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;


    setCarregando(true);
    setErro(null);


    try {
      const dadosFeed = await baixarFeedRSS(url);


      const novaFonte = {
        id: crypto.randomUUID(),
        nome: dadosFeed.fonte.titulo || 'Nova Fonte',
        endereco: url,
        descricao: dadosFeed.fonte.descricao || 'Sem descrição informada.',
        categoria: 'Geral',
        noticias: dadosFeed.noticias,
      };


      if (onAdicionarFonte) {
        onAdicionarFonte(novaFonte);
      }


      setUrl('');
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar o feed RSS do link informado.');
    } finally {
      setCarregando(false);
    }
  };


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="url"
          placeholder="Cole aqui o link/URL do feed RSS (ex: https://site.com/rss)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={carregando}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #aeaeca',
            fontSize: '15px'
          }}
        />
        <button
          type="submit"
          disabled={carregando}
          style={{
            padding: '10px 18px',
            borderRadius: '6px',
            backgroundColor: '#aeaeca',
            color: 'rgb(17, 17, 17)',
            border: 'none',
            fontWeight: 'bold',
            cursor: carregando ? 'wait' : 'pointer',
          }}
        >
          {carregando ? 'Carregando...' : 'Adicionar Fonte'}
        </button>
      </form>


      {erro && (
        <p style={{ color: '#c0392b', marginTop: '10px', fontSize: '14px', textAlign: 'left' }}>
          ⚠️ {erro}
        </p>
      )}
    </div>
  );
}

