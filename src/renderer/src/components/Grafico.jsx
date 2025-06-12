import { Bar } from "react-chartjs-2"
import { Chart, LinearScale, BarElement, CategoryScale, plugins, Legend, Title } from "chart.js"
import axios from "axios";
import { useEffect, useState } from "react";

Chart.register(LinearScale, BarElement, CategoryScale, Title, Legend)

export default function Grafico() {
    const [grafico, setGrafico] = useState([])

useEffect(() => {
    //buscando dados na api
    const buscarDados = async() => {
        try {
const res = await axios.get(`https://api.mercadolibre.com/orders/search?seller=${dados.sellerid}&access_token=${token.tokenaccess}&sort=date_desc`);
const results = res.data.results

await Promise.all(results.map(ad => {
const mes = new Date(ad.date_created).toLocaleString('pt-br', {month: 'long'})
const ano = new Date(ad.date_created).getFullYear()

if(anoAtual != ano) return
valores.find(a => a.mes == mes).valor += ad.total_amount

}))

setGrafico(valores)
}catch(err) {
    console.log('algum erro aconteceu: ', err)
}
    }

    buscarDados()
})

const token = JSON.parse(localStorage.getItem('tokens'))
const dados = JSON.parse(localStorage.getItem('clientdata'))

const valores = [
    {mes: 'janeiro', valor: 0},
    {mes: 'fevereiro', valor: 0},
    {mes: 'março', valor: 0},
    {mes: 'abril', valor: 0},
    {mes: 'maio', valor: 0},
    {mes: 'junho', valor: 0},
    {mes: 'julho', valor: 0},
    {mes: 'agosto', valor: 0},
    {mes: 'setembro', valor: 0},
    {mes: 'outubro', valor: 0},
    {mes: 'novembro', valor: 0},
    {mes: 'dezembro', valor: 0}
]
const anoAtual = new Date().getFullYear()

//configuracoes do grafico
const graficoData = {
    datasets: [{
        label: 'Receita',
        data: grafico,
        backgroundColor: "#00FF00",
        parsing: {
            xAxisKey: "mes",
            yAxisKey: "valor"
        }
    }]
}

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Receita Anual'
        },
        Legend: {
            position: 'top'
        }
    },
    scales: {
        x: {
            type: 'category',
            position: "bottom",
            min: 1,
            title: {
                display: true,
                text: "Meses"
            }
        },

        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Receita"
            }
        }
    }
}
    return (
        <div className="w-full h-1/2 mt-auto">
        <Bar data={graficoData} options={options}/>
        </div>
    )
}