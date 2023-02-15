import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateImage from './pages/CreateImage';
import CreateText from './pages/CreateText';
import ChatForm from './components/ChatForm';

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(80vh)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-image" element={<CreateImage />} />
          <Route path="/create-text" element={<CreateText />} />
          <Route path="/create-text/:name" element={<ChatForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App