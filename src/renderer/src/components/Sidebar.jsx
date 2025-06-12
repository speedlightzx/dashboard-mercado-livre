import '../styles/global.css'
import { useNavigate } from 'react-router-dom'
import { Barcode, Clipboard, ClipboardList, FileText, Home, KeyRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Alert } from '@mui/material'

export default function Sidebar({ pagina }) {
    const navigate = useNavigate()
    const [sucesso, setSucesso] = useState(false)
    const [msg, setMsg] = useState("")

    const inicio = useRef()
    const cadastrar = useRef()
    const vendas = useRef()
    const produtos = useRef()
    const dadosapi = useRef()

    const ativar = (ref) => {
      ref.current.classList.add('ativo')
    }

      const gerarToken = async () => {
    let dados = JSON.parse(localStorage.getItem('clientdata'))
    let token = JSON.parse(localStorage.getItem('tokens'))
    if(!dados) {
      setMsg('Nenhum dado foi encontrado.')
      setTimeout(() => {
        setMsg('')
      }, 5000)
      return 
    }
    if(!token) {
      setMsg('Nenhum token foi encontrado.')
      setTimeout(() => {
        setMsg('')
      }, 5000)
      return 
    }
    var URL = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${dados.id}&client_secret=${dados.secret}&refresh_token=${token.tokenrefresh}`

    try {
      let res = await fetch(URL, {
        method: 'POST',
        headers: {
          "accept": "application/json",
          "content-type": "application/x-www-form-urlencoded"
        }
      })

      const resjson = await res.json()
      if(resjson.status != '200' && !resjson.access_token) return setMsg(resjson.message)
  
      setMsg('Token atualizado.')
      setSucesso(true)
      localStorage.setItem('tokens', JSON.stringify({ tokenaccess: resjson.access_token, tokenrefresh: resjson.refresh_token }))
      setInterval(() => {
        setMsg('')
      }, 5000)

    } catch(err) {
      setSucesso(false)
      setMsg(err)
    }
  }

useEffect(() => {
  if(pagina == 'inicio') ativar(inicio)
  if(pagina == 'produtos') ativar(produtos)
  if(pagina == 'vendas') ativar(vendas)
  if(pagina == 'cadastrar') ativar(cadastrar)
  if(pagina == 'dadosapi') ativar(dadosapi)
}, [])

    return (
  <aside className='border-1 h-screen w-60 flex shadow-md bg-gray-100 flex-col'>
    <div className='flex justify-center h-full max-h-[45vh] mt-50'>
  <nav className="self-center flex flex-col w-full font-semibold gap-y-[20px]">
<li className='flex flex-col gap-y-[20px]'>
      <a
      ref={inicio}
      onClick={() => navigate('/')}
      className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300`}>
      <Home className="text-blue-600" />
      <p>Início</p>
    </a>
    <a
    ref={cadastrar}
      onClick={() => navigate('/cadastro')}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300">
      <Clipboard className="text-blue-600" />
      Cadastrar
    </a>

    <a
      ref={vendas}
      onClick={() => navigate('/vendas')}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300">
      <Barcode className="text-blue-600" />
      Vendas
    </a>

    <a
    ref={produtos}
      onClick={() => navigate('/produtos')}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300">
      <ClipboardList className="text-blue-600" />
      Anúncios
    </a>

    <a
    ref={dadosapi}
      onClick={() => navigate('/dados')}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300">
      <FileText className="text-blue-600" />
      Dados API
    </a>
</li>
  <button
 onClick={() => gerarToken()} 
 className='flex text-center items-center gap-3 p-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-300'>
 <KeyRound className='text-blue-600'/>
 Atualizar Token
 </button>

{msg && 
 <Alert severity={sucesso ? 'success' : 'error'}>
  {msg}
</Alert>
}
  </nav>
    </div>

      </aside>
    )
}