import './App.css';
import Register from './components/Register';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
