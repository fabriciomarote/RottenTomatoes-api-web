import React, { useContext } from 'react'
import { Context } from './Contexto';
import { RegisterContext } from './ContextoRegister';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModel from '../components/CategoryModel.jsx';
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

    const buttonsLogeado = () => {
      return(
        <>
          <div className="buttons-content">
            <a href={`/profile/${user.id}`} id="btn">{user.name} PROFILE </a>
            <a onClick={() => {setContextState(false); logout()}}  id="btn"> LOG OUT</a>
          </div>
        </>
      )
    }
    
    const buttonsSinLoguearse = () => {
      return(
        <>
          <div className="buttons-content">
            <a onClick={() => {setRegisterState(true)}} id="btn"> SIGN UP</a>
            <a onClick={() => {setContextState({
  bool: true,
  message: ""
})}} id="btn"> LOG IN</a>
          </div>
        </>  
      )
    }
    
    const Buttons =  !!localStorage.getItem("token")  ? buttonsLogeado : buttonsSinLoguearse ;

    return (   
      <>
        <div className='modalOpened' >
          
            {!isLogged && contextState.bool && <Modal />} 
            {!isLogged && registerState  && <ModalRegister />}
        </div>
        <div className="navbar" > 
          <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 navbar-top">
            <div className="col-lg-6 col-md-4 col-sm-5 col-xs-6 left-content">
              <div className="logo-content">
                  <a className="logo" href="/"><img src={logo} alt="logo"/></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-1 col-xs-0 medium-content">
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 right-content">
                <Buttons />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 navbar-down">
            <div className="categories-2">
                {categories.map((category, idx) => {
                return <CategoryModel key={category.id} category={category} />
            })}
            </div>    
          </div>
        </div>
      </>
  )
}

export default NavBar;