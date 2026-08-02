import { useState } from 'react'
import { baixarFeedRSS } from './leitorRSS.jsx'

export default function AdicionarRSS({setFeed}){
    const [textoInserido, setTextoInserido] = useState("")

    async function pegarObjetoDoFeed(url) {
        setTextoInserido("")
        console.log("baixando feed rss de: " + url)
        const objetoFeed = await baixarFeedRSS(url)
        console.log(objetoFeed)
        setFeed(objetoFeed)
    }

    return(
        <>
            <div>
                <input type="text"  onChange={(e) => setTextoInserido(e.target.value)} />
            </div>
            <button onClick={() => pegarObjetoDoFeed(textoInserido)}>
            <p>Salvar texto</p>
            </button>
        </>
    )
}