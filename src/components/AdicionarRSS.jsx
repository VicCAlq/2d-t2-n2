import { useState } from 'react'
import { baixarFeedRSS } from './leitorRSS.jsx'
import { Fontedenoticias } from './fontesDeNoticias.js'
//import TabelaDeNoticias from './components/TabelaDeNoticias.jsx'

export default function AdicionarRSS(){
    const [textoInserido, setTextoInserido] = useState("")
    const [feed, setFeed] = useState()

    async function pegarObjetoDoFeed(url) {
        console.log("baixando feed rss de: " + url)
        await baixarFeedRSS(url)
        .then((resposta) => {
            console.log(resposta)
            const listaDeNoticia = <div>
                {resposta.noticias.map((noticia) => {
                return <div style={{
                    margin: "5px", padding: "5px", backgroundColor: "#7ab",
                }}>
                    <p>Nome: {noticia.titulo}</p>
                    <p>Email: {noticia.link}</p>
                </div>
                })}
            </div>

            setFeed(listaDeNoticia)
        })
  }

    return(
        <>
            <div>
                <input type="text"
                    value={textoInserido}  
                    onChange={(e) => setTextoInserido(e.target.value)} 
                />
            </div>
            <button onClick={() => { 
                pegarObjetoDoFeed(textoInserido)
                setTextoInserido("")
                
                
            }}>
            <p>Salvar texto</p>
            </button>
            {feed}
        </>
    )
}
