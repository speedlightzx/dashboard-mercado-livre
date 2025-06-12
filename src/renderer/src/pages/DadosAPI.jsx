import { useState } from 'react'
import '../styles/global.css'
import Sidebar from '../components/Sidebar'

function DadosAPI() {

  const dados = localStorage.getItem('clientdata')
  if(!dados) localStorage.setItem("clientdata", JSON.stringify({ id: '', secret: '', sellerid: ''}))
  const [clientID, setClientID] = useState(localStorage.getItem('clientdata').id)
  const [clientSecret, setClientSecret] = useState(localStorage.getItem('clientdata').secret)
  const [refreshToken, setRefreshToken] = useState()
  const [sellerID, setSellerID] = useState(localStorage.getItem('clientdata').sellerid)
  const [msg, setMsg] = useState('')

  const submit = async (e) => { //pegando token e guardando no local storage
    e.preventDefault()
    setMsg('')
    if(!sellerID) return setMsg('Insira o SellerID.')
    if(!clientID) return setMsg('Insira o ClientID.')
    if(!clientSecret) return setMsg('Insira o ClientSecret.')
    if(!refreshToken) return setMsg('Insira o Refresh Token.')
    var URL = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}`
    
    try {
      let res = await fetch(URL, {
        method: 'POST',
        headers: {
          "accept": "application/json",
          "content-type": "application/x-www-form-urlencoded"
        }
      })

      const resjson = await res.json()
      if(resjson.status != '200' && !resjson.access_token) return setMsg(`${resjson.message}`)
      
      localStorage.setItem('tokens', JSON.stringify({ tokenaccess: resjson.access_token, tokenrefresh: resjson.refresh_token }))
      localStorage.setItem('clientdata', JSON.stringify({ id: clientID, secret: clientSecret, sellerid: sellerID }))
      setMsg('✅ Tudo salvo corretamente.')

    } catch (err) {
      setMsg(`Erro: ${err}`)
    }
  }

  return (
        <div className='flex overflow-hidden bg-neutral-200'>
            <Sidebar pagina="dadosapi"/>
              <div className='flex justify-center border-1 w-screen'>
                <main className='flex flex-col w-full h-full items-center'>
                    <p className='text-center w-full text-3xl underline font-semibold mt-1'>Dashboard Mercado Livre</p>

<div className='h-full w-full items-center gap-10 flex flex-col justify-center'>
  
  <h2 className='text-3xl text-center font-semibold'>⚠️Insira corretamente os dados ou a dashboard não funcionará corretamente.⚠️</h2>
      <form onSubmit={submit} method='GET' className='flex flex-col border-2 rounded-lg p-5'>

     <label className='place-self-center font-bold'>Seller ID:</label>
     <input type="text"
    className='flex border-1 border-black rounded-lg w-40 text-center place-self-center'
    value={sellerID}
    onChange={(e) => setSellerID(e.target.value)}
    />

    <label className='place-self-center mt-5 font-bold'>Client ID:</label>
    <input type="password"
    className='flex border-1 border-black rounded-lg w-40 text-center place-self-center'
    value={clientID}
    onChange={(e) => setClientID(e.target.value)}
    />

    <label className='place-self-center mt-5 font-bold'>Client Secret:</label>
    <input type="password"
    className='border-1 border-black rounded-lg w-40 text-center place-self-center'
    value={clientSecret}
    onChange={(e) => setClientSecret(e.target.value)}
    />

    <label className='place-self-center mt-5 font-bold'>Refresh Token:</label>
    <input type="password"
    className='border-1 border-black rounded-lg w-40 text-center place-self-center'
    value={refreshToken}
    onChange={(e) => setRefreshToken(e.target.value)}
    />

    <button
     type='submit'
     className='mt-5 cursor-pointer font-bold text-white border-1 border-sky-50 w-50 h-8 place-self-center rounded-lg bg-[#0b8000] hover:bg-green-900'>
    Salvar e Atualizar</button>
    <p className='place-self-center mt-5'>{msg}</p>

</form>
</div>

                </main>
              </div>
            </div>
  )
}

export default DadosAPI
