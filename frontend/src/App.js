import './App.css';
import Register from './components/Register';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';
import JobPage from './components/JobPage';
import JobEdit from './components/JobEdit';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path='/jobs/:id/edit' element={<JobEdit />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
