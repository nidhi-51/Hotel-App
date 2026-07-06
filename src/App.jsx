import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}