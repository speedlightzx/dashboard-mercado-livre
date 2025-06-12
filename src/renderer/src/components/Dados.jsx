import '../styles/global.css'

export default function Dados({ info1, info2 }) {
    return (
              <div className={`border-1 shadow-lg rounded-md max-w-[25vh] w-full max-h-[18vh] h-screen flex flex-col p-2 ${info1 == 'Receita Total' && 'bg-[#32CD32]'} ${info1 != 'Receita Total' && 'bg-white'}`}>
                <p className={`font-semibold text-[14px] underline`}>{info1}</p> 
                <h1 className={`sm:text-[30px] text-center mt-5`}>{info2}</h1>
              </div>
    )
}