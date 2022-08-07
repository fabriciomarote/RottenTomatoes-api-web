import React from 'react'
import MovieService from '../api/movieService';
import { useState } from 'react';
import { useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RegisterContext } from './ContextoRegister';
import { Context } from './Contexto';
import '../styles/ModalRegister.css'

const ModalRegister = () => {

  const [registerState, setRegisterState] = useContext(RegisterContext);
  const [contextState, setContextState] = useContext(Context);
  const [data, setData] = useState({
    name: "",
    email: "",
    image: "",
    password: ""
  });

  const [loginError, setLoginError] = useState (false);
  const [registerErrorName, setRegisterErrorName] = useState("");
  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    MovieService.register(data)
    
         .then(response => {
          setRegisterState(false)
          setContextState({
            bool: true,
            message: "REGISTER SUCCESFULLY!"
          })
        
          
      })
      .catch(error => {setLoginError(true)
         setRegisterErrorName(error.response.data.message)});
  }

  return (
    <div className='registerContainer' style={{  
      pointerEvents: registerState  ? 'auto' : 'auto',
    }}>
      <div className='registerHeader'>
        <h6 className='register-title'>SIGN UP FOR ROTTEN TOMATOES</h6>
        <AiOutlineCloseCircle onClick={() => {setRegisterState(false)}} className='btn-close'/>    
      </div>
      <div className='registerForm'>
      {loginError && (<div className="alert alert-danger" role="alert">{registerErrorName}</div>) }
        <form className='formRegister' onSubmit={ handleSubmit }>
          <label>Name</label>
          <input className='input-register' type='text' name="name" value={data.name} onChange={handleChange("name")} required/>
          <label>Email</label>
          <input className='input-register' type='email' name="email" value={data.email} onChange={handleChange("email")} required/>
          <label>Profile image</label>
          <input className='input-register' type='text' name="image" value={data.image} onChange={handleChange("image")} required/>
          <label>Password</label>
          <input className='input-register' type='password' name="password" value={data.password} onChange={handleChange("password")} required/>
          <div className='confirm-register-btn'>
            <button className='b-reg' type="submit" >CREATE YOU ACCOUNT</button>
          </div>
        </form>
      </div> 
      <div className='modalFooter-register'>
        Already have an account? <p className='r-btn' onClick={() => {contextState({
  bool: true,
  message: ""
}); setRegisterState(false) }}>LOG IN HERE</p>
      </div>
    </div>
  )
}

export default ModalRegister;
