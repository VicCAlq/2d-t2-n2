import { useState } from 'react';
import { useNoticias } from './useNoticias';


export default function GerenciadorNoticias() {
  const { noticias, adicionarNoticia } = useNoticias();
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    descricao: '',
    dataDePublicacao: '',
    categoria: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.endereco) return;


    adicionarNoticia(form);
    setForm({
      nome: '',
      endereco: '',
      descricao: '',
      dataDePublicacao: '',
      categoria: '',
    });
  };


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', color: '#aeaeca' }}>
      <h2>Cadastrar Notícia</h2>


      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          name="nome"
          placeholder="Título / Nome da Notícia"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="endereco"
          placeholder="URL da Notícia (https://...)"
          value={form.endereco}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataDePublicacao"
          value={form.dataDePublicacao}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
        />
        <textarea
          name="descricao"
          placeholder="Resumo ou descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <button type="submit">Salvar Notícia</button>
      </form>


      <hr style={{ margin: '1.5rem 0' }} />


      <h3>Notícias Salvas ({noticias.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {noticias.map((item) => (
          <li key={item.id} style={{ borderBottom: '1px solid rgb(17, 17, 17)', padding: '0.75rem 0', textAlign: 'left' }}>
            <strong style={{ fontSize: '1.1rem' }}>{item.nome}</strong>
            <span style={{ float: 'right', fontSize: '0.85rem', color: '#aeaeca' }}>
              {item.categoria && `[${item.categoria}] `}
              {new Date(item.dataDePublicacao).toLocaleDateString('pt-BR')}
            </span>
            <p style={{ margin: '0.5rem 0' }}>{item.descricao}</p>
            <a href={item.endereco} target="_blank" rel="noreferrer">
              Ler notícia completa
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

