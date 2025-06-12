import '../styles/global.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import { Alert } from '@mui/material'

function Produtos() {

  let anuncios = []
  const [anunciosInfo, setAnuncioInfo] = useState([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {//carregando todas os produtos ao renderizar o componente
    var token = JSON.parse(localStorage.getItem('tokens'))
    var seller_id = JSON.parse(localStorage.getItem('clientdata')) ? JSON.parse(localStorage.getItem('clientdata')).sellerid : ''

    if(!token) {
      setLoading(false)
      return setErro('Nenhum token foi encontrado.')
    }
    if(!seller_id) {
      setLoading(false)
      return setErro('Nenhum sellerID foi encontrado.')
    }
      
    async function carregarAnuncios() {
      //puxando todos os produtos na api
      var URL = `https://api.mercadolibre.com/users/${seller_id}/items/search?access_token=${token.tokenaccess}&orders=start_time_desc`
      var res = await axios.get(URL).catch((err) => {
        setLoading(false)
        return setErro(err.response.data.message)
      })
       anuncios = res.data.results
      //guardando temporariamente em um array, para pegar as visitas de cada anuncio
      await Promise.all(anuncios.map(async (ad) => {//pegando as visitas de cada anuncio no array de anuncios
          try {
            let URL = `https://api.mercadolibre.com/items/${ad}?access_token=${token.tokenaccess}`
            var res = await axios.get(URL)
            var data = res.data

            let URLvisits = `https://api.mercadolibre.com/items/${ad}/visits?date_from=2025-01-01T00:00:00Z&date_to=2025-02-01T00:00:00Z&access_token=${token.tokenaccess}`
            var resvisitsget = await axios.get(URLvisits)

            data = {
              ...data,
              visits: resvisitsget.data.total_visits || 0
            } //adicionando a quantidade de visitas no data

            return data
          } catch(e) {
            console.log(`Erro ao carregar anuncio: ${e}`)
            return null
          }
      })).then(async (ads) => {
        setAnuncioInfo(ads.filter(ad => ad != null))
        setLoading(false)
      }) 
    }
    
    carregarAnuncios()

  }, [])

  const anuncioAtivo = (status) => { //verifica o status do anuncio
    if(status == 'active') return 'Ativo'
    if(status == 'paused') return 'Pausado'
    if(status == 'under_review') return 'Sobre revisão'
  }

  return (
    <div className='flex overflow-hidden bg-neutral-200'>
    <Sidebar pagina="produtos"/>
      <div className='flex border-1 w-screen'>
        <main className='flex flex-col w-full h-full items-center'>
            <p className='text-center w-full text-3xl underline font-semibold mt-1'>Dashboard Mercado Livre</p>

<div className='border-2 p-2 w-full max-w-[110vh] h-full max-h-170 rounded-lg overflow-y-auto overflow-x-hidden mt-12'>
{loading && <Loading/> } {/* se estiver carregando mostrar um loading */}

{!loading && //se ja estiver carregado e tiver anuncios, mostrar cada um deles
anunciosInfo.map((ad,index) => {
return (
<div key={index} className='border-2 p-1 border-black mt-3 w-full h-full max-h-40 max-w-190 rounded-lg place-self-center relative'>

<h1 className='font-extrabold underline place-self-center text-[12px]'>{ad.title}</h1>
<h1 onClick={() => window.open(`${ad.permalink}`)} className='absolute cursor-pointer underline hover:opacity-40 left-140 top-25'>Ir para o anúncio</h1>

<div className='flex'>

<img src={ad.thumbnail} alt="Sem imagem" className='relative left-3 top-[-4px] rounded-lg border-2 border-black w-full max-w-30'/>

<div className='relative left-4 top-1'>
<span className='font-bold'>Preço:</span> R$ {ad.price.toFixed(2)} <br />
<span className='font-bold'>Status:</span> {anuncioAtivo(ad.status)}<br />
<span className='font-bold'>Vendas:</span> {ad.sold_quantity} <br />
<span className='font-bold'>Visitas:</span> {ad.visits} <br /> 
</div>

</div>

</div>
)

})}

{!loading && anunciosInfo.length == 0 && //se ja estiver carregando e nao tiver nenhum anuncio, mostrar que nao tem nenhum anuncio
 <p className='text-center mt-50 text-3xl'>
  Nenhum anúncio encontrado. <br />

{erro && <div className='flex justify-center items-center mt-2'>
 <Alert variant='filled' severity='error'>
  {erro}
</Alert>
  </div>
  }


</p> 
}
     </div>        
        </main>
      </div>
    </div>
  )
}

export default Produtos
