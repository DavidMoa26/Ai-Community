import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'

const Header = () => {
    return (
        <header className="xs:w-full sm:flex sm:justify-between sm:items-center bg-[#4B0082] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] xs:flex xs:justify-center">
            <Link to="/">
                <img src={logo} alt="logo" className="w-20 object-contain rounded-3xl hover:opacity-80" />
            </Link>
            <div className='xs:absolute xs:mt-28 sm:relative sm:mt-0'>
                <Link to="/create-image" className="sm:mr-2 font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Image</Link>
                <Link to="/create-text" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Text</Link>
            </div>
        </header>
    )
}
export default Header