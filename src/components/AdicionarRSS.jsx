import { useState } from 'react'
import { baixarFeedRSS } from './leitorRSS.jsx'

export default function AdicionarRSS({setFeed}){
    const [textoInserido, setTextoInserido] = useState("")

    function pegarObjetoDoFeed(endereco) {
        const objetoFeed = baixarFeedRSS(endereco)
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