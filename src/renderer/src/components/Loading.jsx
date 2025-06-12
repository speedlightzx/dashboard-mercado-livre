import { CircularProgress, Skeleton } from "@mui/material";

export default function Loading() {
    //quando o conteudo nao é carregado a tempo esse componente é mostrado
    return (
<div className="w-full h-full relative">
    <div className=" justify-center flex relative top-67">
        <CircularProgress className="absolute" size="6rem"/>
    </div>
    <div className="p-1 gap-y-2 flex flex-col">
<Skeleton variant='rectangular' height={150} />
<Skeleton variant='rectangular' height={150} />
<Skeleton variant='rectangular' height={150} />
<Skeleton variant='rectangular' height={150} />
    </div>
</div>
    )
}