import React, { useState } from 'react';
import preview from '../assets/preview.png'
import Loader from './Loader';
import Surprise from '../constants/Surprise'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const ImageForm = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);
    const [successSharing, setSuccessSharing] = useState(false)
    const [generatingImg, setGeneratingImg] = useState(false);


    const generateImgHandler = async (e) => {
        if (description) {
            try {
                setGeneratingImg(true);
                const response = await fetch(`${process.env.REACT_APP_API}api/ai/image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: description,
                    }),
                });

                const data = await response.json();
                setName(name)
                setDescription(description)
                setPhoto(`data:image/jpeg;base64,${data.photo}`)
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };

    const surpriseHandler = (e) => {
        e.preventDefault()
        const index = Math.floor(Math.random() * 46)
        const message = Surprise[index];
        setDescription(message)
        setName(name);
        setPhoto(photo)
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (description && photo && name) {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API}api/posts/image-posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        prompt: description,
                        photo: photo
                    }),
                });

                await response.json();
                console.log(response);
                setSuccessSharing(true)
                setTimeout(() => {
                    navigate('/');
                }, 2000);

            } catch (err) {
                alert(err);
            }
        } else {
            alert('Please generate an image with proper details');
        }

    };

    return (
        <form onSubmit={handleSubmit} className='mt-10'>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="imageName">
                    Your Name
                </label>
                <input
                    className="border border-gray-400 p-2 w-full"
                    placeholder='Enter here your full name'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Description
                </label>
                <button
                    className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 mb-1 text-xs"
                    type="button"
                    onClick={surpriseHandler}
                >
                    Create Random Text
                </button>
                <input
                    className="border border-gray-400 p-2 w-full"
                    placeholder='Enter here details for your image , Ex., Dog on moon'
                    type="text"
                    value={description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {photo ? (
                    <img
                        src={photo}
                        alt={description}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-9/12 h-9/12 object-contain opacity-40"
                    />
                )}
                {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                        <Loader />
                    </div>
                )}
            </div>
            <button
                className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 mt-2"
                type="button"
                onClick={generateImgHandler}
            >
                Generate AI Image
            </button>
            <div className="mt-10">
                <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
                <button
                    type="submit"
                    className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-indigo-600"
                >
                    {loading ? 'Sharing...' : 'Share with the Community'}
                    <Modal open={loading} onClose={() => setLoading(false)} successSharing={successSharing} />
                </button>
            </div>
        </form>
    );
};

export default ImageForm;
