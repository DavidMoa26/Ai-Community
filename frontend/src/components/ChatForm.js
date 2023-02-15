import React, { useState } from 'react';
import Loader from './Loader';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Chat = () => {


    const navigate = useNavigate();
    const [result, setResult] = useState('');
    const [input, setInput] = useState('');
    const [name, setName] = useState('')
    const [generatingText, setGeneratingText] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successSharing, setSuccessSharing] = useState(false)


    const handleText = async (e) => {
        e.preventDefault();
        if (input.length > 4) {
            try {
                setGeneratingText(true)
                const response = await fetch(`${process.env.REACT_APP_API}api/ai/text`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        input: input,
                    }),
                });

                if (response.ok) {


                    setGeneratingText(false)
                    const data = await response.json();
                    setResult(data.result)
                    setName(name)
                    setInput(input)
                }
            } catch (err) {
                alert(err);
            }
        } else {
            alert('Please provide proper prompt');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (result && name && input) {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API}api/posts/text-posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        input: input,
                        result: result
                    }),
                });

                await response.json();
                setSuccessSharing(true)
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                setTimeout(() => {
                }, 2000);

            } catch (err) {
                alert(err);
            }
        } else {
            alert('Please generate an text with proper details');
        }

    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className='h-80 bg-purple-100 rounded-3xl p-10 whitespace-pre-line'>
                <div>
                    {generatingText ? <Loader /> : result}
                </div>
            </div>
            <form className=' top-80' onSubmit={handleSubmit}>
                <textarea
                    className="p-4 border border-gray-400 rounded-lg w-full bg-purple-200 "
                    placeholder="Type your message here..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleText} type='button' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 w-32">
                    Send
                </button>
                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the text you want, you can share it with others in the community **</p>
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
                    <button
                        type="submit"
                        className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-indigo-600"
                    >
                        {loading ? 'Sharing...' : 'Share with the Community'}
                        <Modal open={loading} onClose={() => setLoading(false)} successSharing={successSharing} />
                    </button>
                </div>
            </form>
        </div >
    );
}
export default Chat