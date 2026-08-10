
export default function MenuFontes({ listaFontes, set }) {
    return(<>
        <select>
            {listaFontes.map((fonte) => {
                return <option 
                    value={fonte.nome}
                    onSelect={() => setFiltroFonte(fonte.nome)}
                >{fonte.nome}</option>
            })}
        </select>
    </>)
}