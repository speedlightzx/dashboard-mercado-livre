import colors from '../jsons/colors.json'
import ages from '../jsons/ages.json'
import '../styles/global.css'

export default function Caracteristicas(props) {

const cores = JSON.parse(JSON.stringify(colors.cores))
const idades = JSON.parse(JSON.stringify(ages.idades_recomendadas))

return (
    <div className="place-self-center flex flex-col h-full w-full">

    {/* id do wrap sling, caso a categoria seja diferente da do wrap sling, é renderizado abaixo */}
    {props.id != 'MLB270883' && <div className='flex flex-col'> 
        
    <label className="text-center font-bold">Altura(cm):</label>
    <input type="number"
    value={props.height}
    onChange={(e) => props.setHeight(e.target.value)}
    min={0}
    className="flex border-1 border-black rounded-lg w-full max-w-50 text-center place-self-center"/>
    </div>}

    {/* id do canguru, caso a categoria seja diferente da do canguru, é renderizado abaixo */}
    {props.id != 'MLB40402' && <div className='flex flex-col'>
        
    <label className="text-center font-bold mt-5">Nome do desenho:</label>
    <input type="text" 
    value={props.cartoon}
    onChange={(e) => props.setCartoon(e.target.value)}
    className="flex border-1 border-black rounded-lg w-full max-w-50 text-center place-self-center"/>

    <label className="text-center font-bold mt-5">Cor:</label>
    <select defaultValue="a" value={props.color} onChange={(e) => props.setColor(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-33 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    {cores.map((cor, index) => {
        return <option key={index} value={cor.id}>{cor.name}</option>
    })}
    </select>
    </div>}

    <label className="text-center font-bold mt-5">Largura(cm):</label>
    <input type="number" 
    value={props.width}
    onChange={(e) => props.setWidth(e.target.value)}
    min={0}
    className="flex border-1 border-black rounded-lg w-full max-w-50 text-center place-self-center"/>

    <label className="text-center font-bold mt-5">Idade Recomendada:</label>
    <select defaultValue="a" value={props.age} onChange={(e) => props.setAge(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-30 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    {idades.map((idade, index) => {
        return <option key={index} value={idade.name}>{idade.name}</option>
    })}
    </select>

    {/* naninhas */}
    {props.id == 'MLB417898' && <div className="flex flex-col"> 

    <label className="text-center font-bold mt-5">Material:</label>
    <select defaultValue="a" value={props.material} onChange={(e) => props.setMaterial(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Algodão">Algodão</option>
    <option value="Poliéster">Poliéster</option>
    </select>

    <label className="text-center font-bold mt-5">Hipoalergênico?</label>
    <select defaultValue="a" value={props.hypo} onChange={(e) => props.setHypo(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>
    
    </div>}

    {/* banheiras */}
    {props.id == 'MLB40602' && <div className="flex flex-col"> 

    <label className='font-bold place-self-center mt-5'>É dobrável?</label>
    <select defaultValue="a" value={props.foldable} onChange={(e) => props.setFoldable(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>

    <label className='font-bold place-self-center mt-5'>Possui trocador?</label>
    <select defaultValue="a" value={props.changingPad} onChange={(e) => props.setCP(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>
    
    </div>}

    {/* troninhos */}
    {props.id == 'MLB86696' && <div className="flex flex-col"> 

<label className='font-bold place-self-center mt-5'>Tipo de Produto:</label>
<select defaultValue="a" value={props.productType} onChange={(e) => props.setProduct(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-70 place-self-center'>
<option value="a" disabled>Selecionar</option>
<option value="Penico">Penico</option>
<option value="Mictório">Mictório</option>
<option value="Assento redutor">Assento redutor</option>
<option value="Assento redutor com escada">Assento redutor com escada</option>
<option value="Penico com adaptador de assento">Penico com adaptador de assento</option>
</select>
    
    </div>}

    {/* cangurus */}
    {props.id == 'MLB40402' && <div className="flex flex-col"> 

    <label className="text-center font-bold mt-5">Material:</label>
    <select defaultValue="a" value={props.material} onChange={(e) => props.setMaterial(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Tecido">Tecido</option>
    <option value="Poliéster">Poliéster</option>
    </select>

    <label className="text-center font-bold mt-5">Quantidade de posições:</label>
    <input type='number' min={0} max={10} value={props.positions} onChange={(e) => props.setPositions(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />
    
    <label className="text-center font-bold mt-5">Com tiras ajustáveis?</label>
    <select defaultValue="a" value={props.straps} onChange={(e) => props.setStraps(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>

    <label className="text-center font-bold mt-5">Com capuz?</label>
    <select defaultValue="a" value={props.hood} onChange={(e) => props.setHood(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>

    <label className="text-center font-bold mt-5">Com bolsos?</label>
    <select defaultValue="a" value={props.pockets} onChange={(e) => props.setPockets(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
    </select>

    <label className="text-center font-bold mt-5">Quantidade de bolsos:</label>
    <input type='number' min={0} max={100} value={props.pocketsNumber} onChange={(e) => props.setPocketsNumber(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    <label className="text-center font-bold mt-5">Peso mínimo suportado(KG):</label>
    <input type='number' min={0} max={255} value={props.minWeight} onChange={(e) => props.setMinWeight(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    <label className="text-center font-bold mt-5">Peso máximo suportado(KG):</label>
    <input type='number' min={0} max={255} value={props.maxWeight} onChange={(e) => props.setMaxWeight(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    <label className="text-center font-bold mt-5">Profundidade(cm):</label>
    <input type='number' min={0} max={255} value={props.depth} onChange={(e) => props.setDepth(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    </div>}

    {/* wrap slings */}
    {props.id == 'MLB270883' && <div className="flex flex-col"> 

    <label className="text-center font-bold mt-5">Composição:</label>
    <select defaultValue="a" value={props.material} onChange={(e) => props.setMaterial(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="Lã">Lã</option>
    <option value="Algodão">Algodão</option>
    </select>

    <label className="text-center font-bold mt-5">Tamanho:</label>
    <select value={props.size} onChange={(e) => props.setSize(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="L">L(grande)</option>
    <option value="M">M(médio)</option>
    <option value="S">S(pequeno)</option>
    </select>
    
    <label className="text-center font-bold mt-5">Comprimento(cm):</label>
    <input type='number' min={0} max={255} value={props.length} onChange={(e) => props.setLength(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    <label className="text-center font-bold mt-5">Peso mínimo suportado:</label>
    <input type='number' min={0} max={255} value={props.minWeight} onChange={(e) => props.setMinWeight(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    <label className="text-center font-bold mt-5">Peso máximo suportado:</label>
    <input type='number' min={0} max={255} value={props.maxWeight} onChange={(e) => props.setMaxWeight(e.target.value)} className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center' />

    </div>}

    </div>
)
}