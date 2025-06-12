import '../styles/global.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import { Alert } from '@mui/material'

function Vendas() {

  var navigate = useNavigate()
  const [vendasInfo, setVendasInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {//carregando todas as vendas ao renderizar o componente
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

    async function carregarVendas() {
      try {
        const res = await axios.get(`https://api.mercadolibre.com/orders/search?seller=${seller_id}&access_token=${token.tokenaccess}&sort=date_desc`);
        setVendasInfo(res.data.results)
        console.log(res.data.results)
        setLoading(false)
      }catch(err) {
        console.log(err)
        setLoading(false)
        setErro(err.response.data.message)
      }
      
    }
    carregarVendas()

  }, [])

  return (
    <div className='flex overflow-hidden bg-neutral-200'>
    <Sidebar pagina="vendas"/>
      <div className='flex border-1 w-screen'>
        <main className='flex flex-col w-full h-full items-center'>
            <p className='text-center w-full text-3xl underline font-semibold mt-1'>Dashboard Mercado Livre</p>

<div className='border-2 p-2 w-full max-w-[110vh] flex flex-wrap gap-3 justify-center h-full max-h-170 rounded-lg overflow-y-auto overflow-x-hidden mt-12'>
{loading && <Loading/>} {/* se as vendas ainda nao carregarem, mostra um loading */}

{!loading && //quando terminar de carregar, listar todas as vendas
vendasInfo.map((ad,index) => {
return (
<div key={index} className='border-2 p-1 border-black w-full h-full max-h-35 max-w-100 rounded-lg place-self-center relative'>
<div className='flex'>
<div className='relative left-4 top-1'>
<span className='font-bold'>Valor:</span> R$ {ad.total_amount.toFixed(2)} <br />
<span className='font-bold'>Comprador:</span> {ad.buyer.nickname} <br />
<span className='font-bold'>Data:</span> {new Date(ad.date_created).toLocaleString("pt-BR")} <br />
<span className='font-bold'>Status:</span> {ad.status == "paid" ? "Pago": "Não Pago/Cancelado"} <br />
</div>

</div>

</div>
)
})}

{!loading && vendasInfo.length == 0 && //se nao tiver nenhuma venda e ja estiver carregado, mostrar que nao tem nenhuma venda
 <p className='text-center mt-50 text-3xl'>
  Nenhuma venda encontrada. <br />

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

export default Vendas
