import { useState } from "react";


export default function TabelaDeNoticias({feed}) {
 
    if (!feed) {
        return(<></>)
    } else {
        return(
            <div>
            <p>
                Carregue a lista de noticias abaixo:
            </p>
            <div>
            //resultado 
            </div>
            </div>
        )
    }

}
