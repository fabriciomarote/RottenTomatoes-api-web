import React, { useState } from 'react'
import { AiOutlineCloseCircle }from 'react-icons/ai';
import { MovieService } from '../api/movieService';
import { useContext } from 'react';
import { Context } from './Contexto';
import { RegisterContext } from './ContextoRegister';
import ModalRegister from './ModalRegister';
import '../styles/Modal.css'

const Modal = () => {

  const [contextState, setContextState] = useContext(Context);
  const [registerState, setRegisterState] = useContext(RegisterContext);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [loginError, setLoginError] = useState (false);
  const [loginErrorName, setLoginErrorName] = useState("");

  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    MovieService.login(data)
    .then(response => {
        localStorage.setItem("token",response.headers.authorization);
        window.location.reload();  
      })
    .catch(error =>{ setLoginError(true)
      setLoginErrorName(error.response.data.message)});
  }

  return ( 
    <>
      <div className='modalContainer' style={{ pointerEvents: contextState  ? 'auto' : 'auto',}}>
        {registerState  && <ModalRegister />}
        <div className='modalHeader'>
          
          <p className='modal-title'>SIGN IN </p>
          <p className='modal-title' id='title-msg'>{contextState.message}</p>
          
          <AiOutlineCloseCircle onClick={() => {setContextState({
  bool: false,
  message: ""
})}} className='btn-close'/>   
        </div>
        <div className='modalForm'>
          {loginError && (<div className="alert alert-danger" role="alert">{loginErrorName}</div>) }
          <form className='formModal' onSubmit={handleSubmit}>
            <div className='modal-inputs'>
              <label>Email adress</label>
              <input className="form-input" type='text' name="email" value={data.email} onChange={handleChange("email")} required  ></input>
              <label>Password</label>
              <input className="form-input" type='password' name="password" value={data.password} onChange={handleChange("password")} required></input> 
            </div>
            <button type="submit" className="btn-btn btn-info b-log">LOG IN</button>
          </form>
        </div>
        <div className='modalFooter'>
            Don't have an account? <p className='s-btn' onClick={() => {setRegisterState(true); setContextState({
  bool: false,
  message: ""
})}}>SIGN UP HERE</p>
        </div>
      </div>
    </>
  )
}
export default Modal;
