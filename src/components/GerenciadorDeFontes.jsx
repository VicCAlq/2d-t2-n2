import { useState } from 'react';


export function useFontesDeNoticias() {
  const [fontes, setFontes] = useState([]);


  const adicionarFonte = ({ nome, endereco, descricao, categoria }) => {
    const novaFonte = {
      id: crypto.randomUUID(),
      nome,
      endereco,
      descricao,
      categoria,
    };
    setFontes((prev) => [...prev, novaFonte]);
  };


  const buscarPorCategoria = (categoria) => {
    return fontes.filter(
      (f) => f.categoria.toLowerCase() === categoria.toLowerCase()
    );
  };


  return { fontes, adicionarFonte, buscarPorCategoria };
}


export default function GerenciadorDeFontes() {
  const { fontes, adicionarFonte } = useFontesDeNoticias();
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    descricao: '',
    categoria: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.endereco) return;


    adicionarFonte(form);
    setForm({ nome: '', endereco: '', descricao: '', categoria: '' });
  };


  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem', color: '#aeaeca' }}>
      <h2>Cadastrar Fonte de Notícias</h2>
     
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome da Fonte"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="endereco"
          placeholder="Endereço (https://...)"
          value={form.endereco}
          onChange={handleChange}
          required
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
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Fonte</button>
      </form>


      <hr style={{ margin: '1.5rem 0' }} />


      <h3>Fontes Salvas ({fontes.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {fontes.map((fonte) => (
          <li key={fonte.id} style={{ borderBottom: '1px solid rgb(17, 17, 17)', padding: '0.5rem 0' }}>
            <strong>{fonte.nome}</strong> <small>({fonte.categoria})</small>
            <br />
            <a href={fonte.endereco} target="_blank" rel="noreferrer">
              {fonte.endereco}
            </a>
            <p style={{ margin: '0.25rem 0 0' }}>{fonte.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

