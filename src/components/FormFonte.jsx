import { useState } from "react";

export default function FormFonte({ aoAdicionar }) {
  const [url, setUrl] = useState("");

  function enviar(e) {
    e.preventDefault();

    if (!url.trim()) return;

    aoAdicionar(url.trim());
    setUrl("");
  }

  return (
    <form onSubmit={enviar}>
      <input
        type="text"
        placeholder="Digite a URL do RSS"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button type="submit">
        Adicionar
      </button>
    </form>
  );
}
