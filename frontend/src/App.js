import './App.css';
import Register from './components/Register';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      Hello COSC360Project!
      <Register/>
      <Login />
      <Footer />
    </div>

  );
}

export default App;
