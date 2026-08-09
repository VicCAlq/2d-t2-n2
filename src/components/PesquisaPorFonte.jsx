import { useState } from "react";

function PesquisaPorFonte({ noticias, aoFiltrar }) {
    const [termo, setTermo] = useState("");

    function handleChange(valor) {
        setTermo(valor);

        const termoBusca = valor.toLowerCase();

        const resultado = noticias.filter((noticia) =>
            noticia.fonte?.toLowerCase().includes(termoBusca)
        );

        aoFiltrar(resultado);
    }

    return (
        <input
            type="text"
            placeholder="Pesquisar por Fonte..."
            value={termo}
            onChange={(e) => handleChange(e.target.value)}
            style={{
                padding: "8px",
                width: "20%",
                marginBottom: "10px",
                boxSizing: "border-box",
            }}
        />
    );
}

export default PesquisaPorFonte;