import { useState } from 'react'
import { baixarFeedRSS } from './leitorRSS.jsx'
import Fontedenoticias from './fontesDeNoticias.js'

export default function AdicionarRSS({ setFeed , setFonte}) {
    const [textoInserido, setTextoInserido] = useState("")

    async function pegarObjetoDoFeed(url) {
        console.log("baixando feed rss de: " + url)
        await baixarFeedRSS(url)
            .then((resposta) => {
                console.log(resposta)
                setFeed(resposta.noticias)
                setFonte(resposta.fonte)
            })
    }

    return (
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
        </>
    )
}
