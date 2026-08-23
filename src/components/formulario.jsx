import { useState } from "react";

import { baixarFeedRSS } from "./leitorRSS";
import {
  adicionarFonte,
  adicionarNoticia
} from "./database";
import { FonteDeNoticias } from "./FonteDeNoticias";
import { Noticias } from "./Noticias";
export function Formulario({onFonteAdicionada}) {
  const [url, setUrl] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  async function handleSave(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");
    setCarregando(true);
    try {
      const resultado = await baixarFeedRSS(url);
      const fonteRSS = resultado.fonte;
      const noticiasRSS = resultado.noticias;
      const fonte = new FonteDeNoticias(fonteRSS.titulo,fonteRSS.link || url,fonteRSS.descricao,"Geral");
      await adicionarFonte({nome: fonte.nome,endereco: fonte.endereco,descricao: fonte.descricao,categoria: fonte.categoria});
      for (const noticiaRSS of noticiasRSS) {
        const categoria = noticiaRSS.categoria?.[0] || "Geral";
        const noticia = new Noticias(noticiaRSS.titulo,noticiaRSS.link,noticiaRSS.descricao,noticiaRSS.dataDePublicacao,categoria);
        await adicionarNoticia({
          nome: noticia.nome,
          endereco: noticia.endereco,
          descricao: noticia.descricao,
          dataDePublicacao: noticia.dataDePublicacao,
          categoria: categoria,
          fonte: fonte.nome
        });
      }
      setMensagem(`Fonte adicionada com sucesso! ${noticiasRSS.length} notícias foram encontradas.`);
      if (onFonteAdicionada) {onFonteAdicionada();}
      setUrl("");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar essa fonte. Verifique o endereço e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }
  return (
    <div>
      <h2>Adicionar fonte de notícias</h2>
      <form className="formulario" onSubmit={handleSave}>
        <input className="campo-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://exemplo.com/feed.xml" required disabled={carregando}/>
        <button className="botao-adicionar" type="submit" disabled={carregando}>
          {carregando ? "Carregando..." : "Adicionar fonte"}
        </button>
      </form>
      {mensagem && (
        <p>
          {mensagem}
        </p>
      )}
      {erro && (
        <p>
          {erro}
        </p>
      )}
    </div>
  );
}
