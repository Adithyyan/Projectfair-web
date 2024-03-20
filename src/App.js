import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Auth from './components/Auth';

function App() {
  const {isAuthToken,}
  return (
    <div >

      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='/login' element={<Auth/>} />

        <Route path='/register' element={<Auth register/>} />

        <Route path='/dashboard' element={isAuthToken?<Dashboard Dashboard/>} />

        <Route path='/project' element={<Projects/>} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
