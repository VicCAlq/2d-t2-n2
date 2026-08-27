import { useState } from "react";
export default function PuxarInfo() {
    const [noticia, setNoticias] = useState (<p>As informações do link aparecerão aqui</p>)
    async function PuxarInfo() {
        await fetch(
                  'https://jsonplaceholder.typicode.com/users/4',
      
      { method: 'GET', }
        )
        .then ((noticia) => {
            console.log(noticia)
            return noticia.json
        })
        .then ((noticia) => {
            console.log(noticia)
            const sla = <div style={{
                margin: "10px", padding:"5px", backgroundColor:"red", borderRadius: "5px",
                
            }}>
                </div>
                const estilo = {
  view: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "#303540",
    padding: "10px",
    margin: "10px",
    gap: "10px",
  },
  texto: {
    color: "#eee",
    fontSize: "32px",
  },
  textoBotao: {
    color: "#eee",
    fontSize: "16px",
  },
  botao: {
    borderRadius: "5px",
    backgroundColor: "#505560",
    padding: "10px",
    margin: "10px",
  },
  viewBotoes: {
    display: "flex",
    flexDirection: "row",
    flex: "1 0",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderRadius: "5px",
    backgroundColor: "#bbb",
    padding: "4px",
  }
}
        })
    }
    return(
    <div style={estilo.view}>
      <p style={estilo.noticia}>
        {noticia}
      </p>
      <input
        type="text"
        value={textoInserido}
        style={estilo.input}
        onChange={(e) => setTextoInserido(e.target.value)}
        placeholder="Digite a URL aqui"
      />
      <button style={estilo.botao} onClick={() => setTexto(textoInserido)}>
        <p style={estilo.textoBotao}>Pesquisar</p>
      </button>
    </div>
    )
}