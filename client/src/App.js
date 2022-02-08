import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Notfound from './components/Notfound'
import Booking from './pages/Booking';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Booked from './pages/Booked'
import Admin from './pages/Admin';
import Editroom from './components/Admin/Editroom';
import Edituser from './components/User/Edituser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/booking" element={<Booking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booked" element={<Booked />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/editroom" element={<Editroom />} />
          <Route path="/edituser" element={<Edituser />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      <Chatbot/>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
