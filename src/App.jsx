import { useState } from "react";
import FormularioFonte from "./components/FormularioFonte";
import TabelaNoticias from "./components/TabelaNoticias";
import { corDaCategoria } from "./cores";

export default function App() {
  const [fontes, setFontes] = useState([]);
  const [noticias, setNoticias] = useState([]);

  function handleAdicionarFonte(novaFonte, novasNoticias) {
    setFontes((prev) => [...prev, novaFonte]);
    setNoticias((prev) => [...prev, ...novasNoticias]);
  }

  return (
    <div className="app-shell">
      <div className="masthead">
        <span className="masthead-eyebrow">Tempo real</span>
        <h1 className="masthead-title">Agregador de Notícias</h1>
      </div>

      <div className="container">
        <div className="dispatch-panel">
          <span className="dispatch-label">Cadastrar nova fonte</span>
          <FormularioFonte onAdicionarFonte={handleAdicionarFonte} />
        </div>

        <div className="stat-bar">
          <div className="stat-block">
            <span className="stat-value">{fontes.length}</span>
            <span className="stat-label">Fontes cadastradas</span>
          </div>
          <div className="stat-block">
            <span className="live-dot"></span>
            <span className="stat-value">{noticias.length}</span>
            <span className="stat-label">Notícias</span>
          </div>
        </div>

        <h2 className="section-heading">Fontes cadastradas</h2>
        <ul className="source-list">
          {fontes.map((fonte, i) => {
            const cor = corDaCategoria(fonte.categoria);
            return (
              <li className="source-item" key={i}>
                <span className="source-name">{fonte.nome}</span>
                <span className="pill" style={{ background: cor.bg, color: cor.texto }}>
                  {fonte.categoria}
                </span>
                <span className="source-url">{fonte.endereco}</span>
              </li>
            );
          })}
        </ul>

        <h2 className="section-heading">Notícias</h2>
        <TabelaNoticias noticias={noticias} fontes={fontes} />
      </div>
    </div>
  );
}