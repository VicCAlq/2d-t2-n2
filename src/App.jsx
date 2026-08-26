import { useState } from 'react';
import FormularioNovaFonte from './components/FormularioNovaFonte';
import TabelaNoticias from './components/TabelaNoticias';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'rgb(17, 17, 17)',
    alignItems: 'center',
    padding: '20px'
  },
  title: {
    color: '#aeaeca'
  }
};


export default function App() {
  const [fontes, setFontes] = useState([]);


  const handleAdicionarFonte = (novaFonte) => {
    setFontes((prev) => [novaFonte, ...prev]);
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Leitor e Gerenciador de Notícias</h1>


      {/* Campo para adicionar novos links RSS */}
      <FormularioNovaFonte onAdicionarFonte={handleAdicionarFonte} />


      {/* Tabela com menus de filtro no topo */}
      <TabelaNoticias fontes={fontes} />
    </div>
  );
}

