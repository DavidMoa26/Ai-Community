import React from "react";
import FileSaver from 'file-saver';
import download from '../assets/download.png'

const ImagePost = ({ name, description, image, _id, hidden }) => {

    const downloadImage = async (_id, image) => {
        FileSaver.saveAs(image, `download-${_id}.jpg`);
    }

    return (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg m-4 hover:scale-105 duration-300 ${hidden ? 'hidden' : 'visible'}`}>
            <img className="w-full" src={image} alt='Error' />
            <div className="mt-5 flex justify-between items-center gap-2">
                <div className=" w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-black text-xs font-bold">{name[0]}</div>
                <p className="text-black text-sm font-bold">Creator : {name}</p>
                <div>
                    <button type="button" onClick={() => downloadImage(_id, image)} className="outline-none bg-transparent border-none">
                        <img src={download} alt="download" className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="p-1 mt-6 mb-2">"{description}"</div>
        </div>
    );
};

export default ImagePost;
