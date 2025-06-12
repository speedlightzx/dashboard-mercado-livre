import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Produtos from './pages/Produtos'
import DadosAPI from './pages/DadosAPI'
import Cadastrar from './pages/Cadastrar'
import Vendas from './pages/Vendas'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/produtos",
    element: <Produtos />
  },
  {
    path: "/dados",
    element: <DadosAPI />
  },
  {
    path: "/cadastro",
    element: <Cadastrar />
  },
  {
    path: "/vendas",
    element: <Vendas />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />

)
