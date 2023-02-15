import React, { useState } from "react";
import CopyToClipboard from "../assets/CopyToClipboard";


const CopiedText = () => {
    return (
        <span className="absolute bottom-10 right-2 font-bold y-0">
            Copied
        </span>
    )
}


const TextPost = ({ name, description, text, hidden }) => {

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 500);
    }








    return (
        <div className={`w-auto h-1/2 rounded overflow-hidden shadow-lg m-4 hover:scale-105 duration-300 p-5 visibility: ${hidden ? 'hidden' : 'visible'}`}>
            <div className="mt-5 flex items-center gap-2">
                <div className=" w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-black text-xs font-bold">{name[0]}</div>
                <p className="text-black text-md font-bold">Creator : {name}</p>
            </div>
            <div className="p-1 mt-6 mb-2 font-bold">Search : "{description}"</div>
            <div className="  whitespace-pre-line" alt='Error'>
                <div className="relative float-right p-1 ">
                    {copied && <CopiedText />}
                    <button onClick={handleCopy} className="pt-4 pr-4"><CopyToClipboard /></button>
                </div>
                <div className="h-full bg-slate-200 rounded-md font-bold p-2 mt-6 mb-2">
                    {text}
                </div>

            </div>
        </div >
    )
}
export default TextPost