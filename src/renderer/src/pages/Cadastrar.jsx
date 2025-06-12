import { useState } from 'react'
import '../styles/global.css'
import axios from 'axios'
import Caracteristicas from '../components/Caracteristicas.jsx'
import categories from '../jsons/categories.json'
import Sidebar from '../components/Sidebar.jsx'
import { Alert } from '@mui/material'

function Cadastrar() {

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('erro')

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [typeAd, setTypeAd] = useState()
  const [category, setCategory] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [files, setFiles] = useState()
  const [brand, setBrand] = useState()
  const [model, setModel] = useState()
  const [code, setCode] = useState()

  const [age, setAge] = useState()
  const [hypoallergenic, setHypoallergenic] = useState()
  const [material, setMaterial] = useState()
  const [color, setColor] = useState()
  const [cartoon, setCartoon] = useState()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [foldable, setFoldable] = useState()
  const [changingPad, setCP] = useState()
  const [productType, setProduct] = useState()
  const [positions, setPositions] = useState(0)
  const [straps, setStraps] = useState()
  const [hood, setHood] = useState()
  const [pockets, setPockets] = useState()
  const [pocketsNumber, setPocketsNumber] = useState()
  const [minWeight, setMinWeight] = useState(0)
  const [maxWeight, setMaxWeight] = useState(0)
  const [depth, setDepth] = useState(0)
  const [size, setSize] = useState(0)
  const [length, setLength] = useState(0)

  let pictures = []
  const categorias = JSON.parse(JSON.stringify(categories.categorias))

  const submit = async (e) => {
    e.preventDefault()
    setSucesso('info')
    setErro('Criando anúncio...')
    await SetImages()

    const anuncio = {
      "title": title,
      "category_id": category,
      "currency_id": "BRL",
      "price": price,
      "available_quantity": quantity,
      "buying_mode": "buy_it_now",
      "condition": "new",
      "listing_type_id": typeAd,
      "pictures": pictures.map(img => ({ "source": `${img}`})),
      "attributes": [
        {
          "id": "PRODUCT_TYPE",
          "value_name": productType
        },
        {
          "id":"BRAND",
          "value_name": brand
        },
        {
          "id": "MODEL",
          "value_name": model
        },
        {
          "id": "WITH_CHANGING_PAD",
          "value_name": changingPad
        },
        {
          "id": "IS_FOLDABLE",
          "value_name": foldable
        },
        {
          "id": "HEIGHT",
          "value_name": `${height}cm`
        },
        {
          "id": "WIDTH",
          "value_name": `${width}cm`
        },
        {
          "id": "PATTERN_NAME",
          "value_name": cartoon
        },
        {
          "id": "COLOR",
          "value_name": color
        },
        {
          "id": "MATERIAL",
          "value_name": material
        },
        {
          "id": "IS_HYPOALLERGENIC_PRODUCT",
          "value_name": hypoallergenic
        },
        {
          "id": "RECOMMENDED_AGE_GROUP",
          "value_name": age
        },
        {
          "id": "POSITIONS_NUMBER",
          "value_name": positions
        },
        {
          "id": "WITH_ADJUSTABLE_STRAPS",
          "value_name": straps
        },
        {
          "id": "WITH_HOOD",
          "value_name": hood
        },
        {
          "id": "WITH_POCKETS",
          "value_name": pockets
        },
        {
          "id": "POCKETS_NUMBER",
          "value_name": pocketsNumber
        },
        {
          "id": "MIN_WEIGHT_SUPPORTED",
          "value_name": `${minWeight}kg`
        },
        {
          "id": "MAX_WEIGHT_SUPPORTED",
          "value_name": `${maxWeight}kg`
        },
        {
          "id": "DEPTH",
          "value_name": `${depth}cm`
        },
        {
          "id": "SIZE",
          "value_name": `${size}cm`
        },
        {
          "id": "LENGTH",
          "value_name": `${length}cm`
        },
        {
          "id": "COMPOSITION",
          "value_name": material
        }
      ],
      "status": "active"
    }
    var postID = ''
    var token = JSON.parse(localStorage.getItem('tokens'))
    if(!token) {
      setSucesso('erro')
      return setErro('Nenhum token foi encontrado.')
    }
      
    try {
      
      var post = await axios.post('https://api.mercadolibre.com/items', anuncio, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.tokenaccess}`
        },
      })

      postID = post.data.id
    } catch(err) {
      console.log(err)
      setSucesso('erro')
      setErro(err ? `${err.response.data.message} ${err.response.data.status || ''}` : err.message)
    }

    if(!postID) return
    if(desc) {
      var body = { "plain_text": desc }
      try {
        const response = await axios.post(`https://api.mercadolibre.com/items/${postID}/description`, body, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.tokenaccess}`
            },
          })
      } catch (err) {
        console.log(err)
      }
    }

    setSucesso('sucesso')
    setErro('Anúncio criado.')
    setTimeout(() => {
      setSucesso('erro')
      setErro('')
    }, 5000)

  }

  const SetImages = async (e) => {
    const imgs = files.split(',')
    await Promise.all(imgs.map(img => pictures.push(img)))
  }

  return (
    <div className='flex overflow-hidden bg-neutral-200'>
        <Sidebar pagina="cadastrar"/>
          <div className='flex justify-center border-1 w-screen'>
            <main className='flex flex-col w-full h-full items-center'>
                <p className='text-center w-full text-3xl underline font-semibold mt-1'>Dashboard Mercado Livre</p>
        <div className='border-2 p-2 w-full max-w-[110vh] h-full max-h-170 rounded-lg overflow-y-auto overflow-x-hidden mt-12 flex'>
           
    <form action='GET' onSubmit={submit} className=' overflow-y-auto w-[60vh] p-2 overflow-x-hidden h-full border-r-2'>
      <div className='overflow-y-auto overflow-x-hidden flex flex-col'>

     <label className='place-self-center font-bold'>Título do anúncio:</label>
     <input type="text"
    className='flex border-1 p-1 border-black rounded-lg w-full max-w-60 text-center place-self-center'
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    maxLength={60}
    required
    />

<label className='place-self-center font-bold mt-5'>Descrição do anúncio:</label>
    <textarea type="text"
    className='flex border-1 border-black rounded-lg w-full max-w-120 p-1 place-self-center'
    value={desc}
    maxLength={50000}
    style={{
      resize: 'vertical',
      maxHeight: '250px',
    }}
    onChange={(e) => setDesc(e.target.value)}
    />

    <label className='place-self-center font-bold mt-5'>Tipo do anúncio:</label>
    <select defaultValue="a" value={typeAd} onChange={(e) => setTypeAd(e.target.value)} required 
    className='text-center border-1 border-black rounded-lg w-full max-w-25 place-self-center'>
    <option value="a" disabled>Selecionar</option>
    <option value="gold_special">Clássico</option>
    <option value="gold_pro">Premium</option>
    </select>

    <label className='place-self-center font-bold mt-5'>URL das imagens:</label>
    <input type="text" value={files} onChange={(e) => setFiles(e.target.value)} required
    className='flex border-1 p-1 border-black rounded-lg w-full max-w-60 text-center place-self-center'
    />

    <label className='place-self-center font-bold mt-5'>Categoria:</label>
    <select defaultValue="selecionar" value={category} onChange={(e) => setCategory(e.target.value)} required 
    className='text-center border-1 border-black rounded-lg w-full max-w-55 place-self-center'>
    <option value="selecionar" disabled>Selecionar</option>
    {categorias.map((c, index) => {
      return  <option key={index} value={c.id}>{c.nome}</option>
    })}
    </select>

    <label className='place-self-center font-bold mt-5'>Marca:</label>
    <input type="text"
    className='flex border-1 border-black rounded-lg w-full max-w-40 text-center place-self-center'
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
    required
    maxLength={255}
    />

<label className='place-self-center font-bold mt-5'>Modelo:</label>
    <textarea type="text"
    className='flex border-1 border-black rounded-lg w-full max-w-60 text-center place-self-center'
    value={model}
    onChange={(e) => setModel(e.target.value)}
    required
    maxLength={255}
    style={{
      resize: 'vertical',
      maxHeight: '250px',
    }}
    />

<label className='place-self-center font-bold mt-5'>Código de Barras:</label>
    <input type="number"
    className='flex border-1 border-black rounded-lg w-full max-w-50 text-center place-self-center'
    value={code}
    onChange={(e) => setCode(e.target.value)}
    
    />

    <label className='place-self-center font-bold mt-5'>Quantidade no estoque:</label>
    <input type="number"
    className='flex border-1 border-black rounded-lg w-full max-w-25 text-center place-self-center'
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    min={1}
    step={1}
    max={9999}
    required
    />

<label className='place-self-center font-bold mt-5'>Preço:</label>
    <input type="number"
    className='flex border-1 border-black rounded-lg w-full max-w-25 text-center place-self-center'
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    min={8}
    required
    />

    <button
     type='submit'
     className='mt-5 cursor-pointer font-bold text-white border-1 border-black w-full h-8 max-w-50 place-self-center rounded-lg bg-[#0b8000] hover:bg-green-900'>
    Cadastrar Produto</button>
    </div>
    </form>

    <div className='flex mx-auto overflow-auto max-w-100 w-full'>
    <Caracteristicas
      height={height}
      setHeight={setHeight}
      width={width}
      setWidth={setWidth}
      cartoon={cartoon}
      setCartoon={setCartoon}
      color={color}
      setColor={setColor}
      material={material}
      setMaterial={setMaterial}
      hypo={hypoallergenic}
      setHypo={setHypoallergenic}
      age={age}
      setAge={setAge}
      id={category}
      foldable={foldable}
      setFoldable={setFoldable}
      changingPad={changingPad}
      setCP={setCP}
      productType={productType}
      setProduct={setProduct}
      positions={positions}
      setPositions={setPositions}
      straps={straps}
      setStraps={setStraps}
      hood={hood}
      setHood={setHood}
      pockets={pockets}
      setPockets={setPockets}
      pocketsNumber={pocketsNumber}
      setPocketsNumber={setPocketsNumber}
      minWeight={minWeight}
      setMinWeight={setMinWeight}
      maxWeight={maxWeight}
      setMaxWeight={setMaxWeight}
      depth={depth}
      setDepth={setDepth}
      size={size}
      setSize={setSize}
      length={length}
      setLength={setLength}/>
    </div>

         </div>
      <div className='place-self-center mt-2'>
     {erro && 
      <Alert variant='filled' severity={sucesso == 'sucesso' ? 'success' : sucesso == 'erro' ? 'error' : 'info'}>
       {erro}
     </Alert>
     }
     </div>
            </main>
          </div>
        </div>
  )
}

export default Cadastrar
