import { useState, useMemo } from 'react';


export default function TabelaNoticias({ fontes }) {
  const [filtroFonte, setFiltroFonte] = useState('TODAS');
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');


  const todasNoticias = useMemo(() => {
    const lista = [];
    fontes.forEach((fonte) => {
      (fonte.noticias || []).forEach((noticia) => {
        const cat = Array.isArray(noticia.categorias) && noticia.categorias.length > 0
          ? noticia.categorias[0]
          : (noticia.categoria || 'Geral');


        lista.push({
          id: noticia.id || crypto.randomUUID(),
          nome: noticia.titulo || noticia.nome || 'Sem título',
          endereco: noticia.link || noticia.endereco || '#',
          descricao: noticia.descricao || '',
          dataDePublicacao: noticia.dataPublicacao || noticia.dataDePublicacao || '',
          categoria: cat,
          fonteNome: fonte.nome
        });
      });
    });
    return lista;
  }, [fontes]);


  const opcoesFontes = useMemo(() => {
    const nomes = fontes.map(f => f.nome);
    return Array.from(new Set(nomes));
  }, [fontes]);


  const opcoesCategorias = useMemo(() => {
    const cats = todasNoticias.map(n => n.categoria).filter(Boolean);
    return Array.from(new Set(cats));
  }, [todasNoticias]);


  const noticiasFiltradas = todasNoticias.filter((noticia) => {
    const bateuFonte = filtroFonte === 'TODAS' || noticia.fonteNome === filtroFonte;
    const bateuCategoria = filtroCategoria === 'TODAS' || noticia.categoria === filtroCategoria;
    return bateuFonte && bateuCategoria;
  });


  return (
    <div style={{ width: '100%', maxWidth: '950px', margin: '20px auto' }}>
     
      {/* --- MENUS DE FILTRO NO TOPO DA TABELA --- */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '15px',
        backgroundColor: 'rgb(17, 17, 17)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px #aeaeca'
      }}>
        {/* Menu 1: Filtrar por Fonte */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', color: '#aeaeca' }}>
            Filtrar por Fonte:
          </label>
          <select
            value={filtroFonte}
            onChange={(e) => setFiltroFonte(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid rgb(17, 17, 17)', fontSize: '14px' }}
          >
            <option value="TODAS">Todas as fontes ({opcoesFontes.length})</option>
            {opcoesFontes.map((fonte) => (
              <option key={fonte} value={fonte}>{fonte}</option>
            ))}
          </select>
        </div>


        {/* Menu 2: Filtrar por Categoria */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', color: '#aeaeca' }}>
            Filtrar por Categoria:
          </label>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid rgb(17, 17, 17)', fontSize: '14px' }}
          >
            <option value="TODAS">Todas as categorias ({opcoesCategorias.length})</option>
            {opcoesCategorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>


      {/* --- TABELA DE NOTÍCIAS --- */}
      <div style={{ overflowX: 'auto', backgroundColor: 'rgb(17, 17, 17)', borderRadius: '8px', boxShadow: '0 2px 4px #aeaeca' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#aeaeca', color: 'rgb(17, 17, 17)' }}>
              <th style={{ padding: '12px 15px' }}>Título</th>
              <th style={{ padding: '12px 15px' }}>Fonte</th>
              <th style={{ padding: '12px 15px' }}>Categoria</th>
              <th style={{ padding: '12px 15px' }}>Data</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {noticiasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Nenhuma notícia encontrada para os filtros selecionados.
                </td>
              </tr>
            ) : (
              noticiasFiltradas.map((noticia) => (
                <tr key={noticia.id} style={{ borderBottom: '1px solid rgb(17, 17, 17)' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#aeaeca' }}>
                    {noticia.nome}
                  </td>
                  <td style={{ padding: '12px 15px', color: '#aeaeca', whiteSpace: 'nowrap' }}>
                    {noticia.fonteNome}
                  </td>
                  <td style={{ padding: '12px 15px', whiteSpace: 'nowrap' }}>
                    <span style={{
                      backgroundColor: 'rgb(17, 17, 17)',
                      color: '#aeaeca',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {noticia.categoria}
                    </span>
                  </td>
                  <td style={{ padding: '12px 15px', fontSize: '13px', color: '#aeaeca', whiteSpace: 'nowrap' }}>
                    {noticia.dataDePublicacao
                      ? new Date(noticia.dataDePublicacao).toLocaleDateString('pt-BR')
                      : '-'}
                  </td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <a
                      href={noticia.endereco}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      Abrir ↗
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
}

