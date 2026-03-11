import './App.css';
import Register from './components/Register';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';
import JobPage from './components/JobPage';
import JobEdit from './components/JobEdit';
import JobNew from './components/JobNew';
import {Route, Routes} from 'react-router-dom';
import JobApplication from './components/JobApplication';
import ViewApplication from './components/ViewApplication';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/jobs/new" element={<JobNew />} />
        <Route path='/jobs/:id/edit' element={<JobEdit />} />
        <Route path='/jobs/:id/apply' element={<JobApplication />} />
        <Route path='/applications/:id' element={<ViewApplication />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
