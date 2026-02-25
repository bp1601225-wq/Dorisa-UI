import type { ReactNode } from "react"

type TextProps = {
    data: string
    text:any
    icon: ReactNode
}


function TextProps({data, text}:any){
return (
<>
<div className="rounded-2xl border-l-5 border-l-black border-slate-300 bg-slate-50 p-4 shadow-sm">
<h1 className="mt-2 text-3xl tracking-wider font-bold flex items-center gap-3 bg-gradient-to-r 
from-yellow-600  via-white to yellow-300 bg-clip-text text-transparent italic">

{data}
</h1>

<p className="mt-2 max-w-2xl text-sm text-slate-500">
{text}
</p>

</div>
</>

)
}

export default TextProps