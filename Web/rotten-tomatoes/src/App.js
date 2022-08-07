import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context } from './components/Contexto';
import { RegisterContext } from './components/ContextoRegister';
import { useContext} from 'react';
import Home from './components/Home';
import Movie from './components/Movie';
import Profile from './components/Profile';
import Category from './components/Category';
import NavBar from './components/NavBar';
import InvalidRoute from './components/InvalidRoute';

function App() {

  const isLogged = !!localStorage.getItem("token");
  const [contextState, setContextState] = useContext(Context);
  const [registerState, setRegisterState] = useContext(RegisterContext);
  return (
    <BrowserRouter>
      <div className='wholePage' style={{  
        pointerEvents: !isLogged && (contextState.bool || registerState) ? 'none' : 'auto',
      }}>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<Movie/>} />
        <Route path="/movie/*" element={<Home/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/category/:id" element={<Category/>} />
        <Route path="*" element={<InvalidRoute/>} />
        <Route path="/invalidRoute" element={<InvalidRoute/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

