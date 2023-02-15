import React from 'react'
import ReactDom from 'react-dom'
import Loader from './Loader'
import Check from '../assets/Check.gif'

const Modal = ({ open, onClose, successSharing }) => {
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 z-10' onClick={onClose} />
            <div className='fixed top-1/2 left-1/2 transform-translate-center z-20'>
                {successSharing ? <img src={Check} alt="Error" className='w-24' /> : <Loader />}
            </div>

        </>,
        document.getElementById('portal')
    )
}

export default Modal