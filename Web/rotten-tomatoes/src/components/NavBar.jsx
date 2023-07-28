import React, { useContext } from 'react'
import { Context } from './Contexto';
import { RegisterContext } from './ContextoRegister';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import ModalRegister from './ModalRegister';
import logo from '../logo.png';
import MovieService from "../api/movieService.js";
import axios from 'axios';
import '../styles/NavBar.css';

 const NavBar = () => {

    const [contextState, setContextState] = useContext(Context);
    const [registerState, setRegisterState] = useContext(RegisterContext);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState({
        id: "",
        name: "",
        image: "",
      })
    
    const navigate = useNavigate();
    const isLogged = !!localStorage.getItem("token");

    axios.defaults.headers['authorization'] = localStorage.getItem('token');

    useEffect(() => {
      if (isLogged){
        MovieService.getUser()
        .then(response => {
          setUser({
            id: response.data.id,
            name: response.data.name,
            image: response.data.image,
          })
        }).catch(error => {
          console.log(error)
        });
      }}, []
      )

    useEffect(() => {
      MovieService.getCategories()
      .then(response => {
        setCategories(response.data.result)
      }).catch(error => {
        console.log(error)
      });
    }, []
    );

    const logout = () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      navigate('/');
    };

    const buttonsLogueado = () => {
      return(
        <>
          <div className="buttons-content">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" id="btn" data-toggle="dropdown">GENRE</button>
              <div className="dropdown-menu">
                {categories.map((category, idx) => {
                  return (
                    <a key={category.id} className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a>
                  );
                })}     
              </div>
            </div>
            <a href={`/profile/${user.id}`} id="btn"> PROFILE </a>
            <a onClick={() => {setContextState(false); logout()}}  id="btn"> LOG OUT</a>
          </div>
        </>
      )
    }
    
    const buttonsSinLoguearse = () => {
      return(
        <>
          <div className="buttons-content">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" id="btn" data-toggle="dropdown">GENRE</button>
              <div className="dropdown-menu">
                {categories.map((category, idx) => {
                  return (
                    <a key={category.id} className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a>
                  );
                })}     
              </div>
            </div>
            <a onClick={() => {setRegisterState(true)}} id="btn"> SIGN UP</a>
            <a onClick={() => {setContextState({ bool: true, message: "" })}} id="btn"> LOG IN</a>
          </div>
        </>  
      )
    }
    
    const Buttons =  !!localStorage.getItem("token")  ? buttonsLogueado : buttonsSinLoguearse ;

    return (   
      <>
        <div className='modalOpened' >
          {!isLogged && contextState.bool && <Modal />} 
          {!isLogged && registerState  && <ModalRegister />}
        </div>
        <div className="navbar-container">
          <div className="nav">
              <input type="checkbox" id="nav-check"/>
                <div className="logo-box">
                  <a href="/"><img src={logo} className="logo" alt="logo"/></a>
                </div>       
              <div className="nav-btn">
                  <label htmlFor="nav-check">
                      <span></span>
                      <span></span>
                      <span></span>
                  </label>
              </div>
              <div className="nav-links">
                  <Buttons/>                      
              </div>
          </div>
        </div>
      </>
  )
}

export default NavBar;