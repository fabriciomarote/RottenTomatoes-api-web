import React from 'react'
import { useNavigate } from 'react-router-dom'
import mike from '../mike.png'
import '../styles/InvalidRoute.css'
export default function InvalidRoute() {

    const navigate = useNavigate()
  return (
    <div className='invalid'>
      <h1>OOPS, PAGE NOT FOUND</h1>
      <h5>The page you requested could not be found</h5>
      <img className='meme' src={mike} />
      <div>
      <button className= 'btn-back' onClick={ ()=> navigate('/')}>BACK TO HOME</button>
      </div>
    </div>
  )
}
