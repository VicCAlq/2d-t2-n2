import { useState } from 'react'
import { baixarFeedRSS } from './leitorRSS.jsx'
import Fontedenoticias from './fontesDeNoticias.js'
import Noticia from './noticias.js'
import {
      connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia,
} from './database.js'
 

export default function AdicionarRSS({ setFeed , setFonte}) {
    const [textoInserido, setTextoInserido] = useState("")

    async function pegarObjetoDoFeed(url) {
        console.log("baixando feed rss de: " + url)
        await baixarFeedRSS(url)
            .then(async (resposta) => {

                console.log(resposta)
              
                for (let noticia of resposta.noticias) {
                    const novaNoticia = new Noticia(
                        noticia.titulo,
                        resposta.fonte.titulo,
                        noticia.link,
                        noticia.descricao,
                        noticia.dataPublicacao,
                        noticia.categorias,
                    )
                    await adicionarNoticia(novaNoticia)
                }
                const novaFonte = new Fontedenoticias(
                    resposta.fonte.titulo,
                    resposta.fonte.descricao,
                    resposta.fonte.link

                )
                await adicionarFonte(novaFonte)
            

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
                    placeholder="Digite a URL "
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
