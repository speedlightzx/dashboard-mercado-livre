import { useEffect, useState } from 'react'
import './styles/global.css'
import Dados from './components/Dados'
import Sidebar from './components/Sidebar'
import axios from 'axios'
import Grafico from './components/Grafico'

export default function App() {
  const [vendas, setVendas] = useState(0)
  const [receita, setReceita] = useState(0)

  const token = JSON.parse(localStorage.getItem('tokens'))
  const dados = JSON.parse(localStorage.getItem('clientdata'))

  const puxarDados = async () => { //buscando dados na api
    if(!token.tokenaccess || !dados.sellerid) return
        const orders_res = await axios.get(`https://api.mercadolibre.com/orders/search?seller=${dados.sellerid}&access_token=${token.tokenaccess}&sort=date_desc`); //listando todas as vendas da conta
        setVendas(orders_res.data.results.filter(ad => ad.status == 'paid').length) //setando o numero de vendas no state
        setReceita(orders_res.data.results.filter(ad => ad.status == 'paid').map(ad => ad.total_amount).reduce((acc, num) => acc + num, 0).toLocaleString()) //calculando o valor de todas as vendas pagas
  }

useEffect(() => {
  puxarDados() 
  //puxando dados e setando intervalo para buscar novamente a cada 1m
  const intervalo = setInterval(() => {
    puxarDados()
  }, 60000)
  return () => clearInterval(intervalo)
}, [])

  return (
    <div className='flex overflow-hidden bg-neutral-200'>
    <Sidebar pagina="inicio"/>
      <div className='flex border-1 w-screen'>
        <main className='flex flex-col w-full'>
            <p className='text-center w-full text-3xl underline font-semibold mt-1'>Dashboard Mercado Livre</p>

      <section className='flex mt-10 justify-between w-full max-w-[60vh] place-self-center'>
        {/* seção onde aparece as informações */}
<Dados info1="Receita Total" info2={`R$ ${receita}`}/>
<Dados info1="Vendas" info2={vendas}/>
            </section>
            {/* gráfico */}
        <Grafico />
        </main>
      </div>
    </div>
  )
}