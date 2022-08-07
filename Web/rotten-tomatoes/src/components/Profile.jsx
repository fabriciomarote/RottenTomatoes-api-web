import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import  MovieService  from '../api/movieService';
import '../styles/Profile.css';

const Profile = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email:"",
    image:"",
    reviews:[]
  })


  useEffect(() => {
    MovieService.getUserById(id)
      .then(response => {
        setUser({ 
          id:response.data.id,
          name: response.data.name,
          email: response.data.email,
          image: response.data.image,
          reviews: response.data.reviews,
        })
      })    
      .catch(error => {
        console.log(error)
        navigate("/invalidRoute"); //aca va la pagina de not found
      })
  }, []
  )

  return (
    <div className='profile-container'>
      <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <div className="user-data-content">
          <img className="user-img" alt="img de usuario" src={user.image} width="100" heigth="100"/>
          <p className="userName">{user.name}</p>
          <h5>{user.email}</h5>
        </div>
      </div>
      <div className='"col-lg-9 col-md-8 col-sm-12 col-xs-12'>
        <div className='title-container-profile'>
          <p className="">Reviews made by {user.name}</p>
        </div>
        <div className='reviews-grid'>
          {user.reviews.map((review) => {
            return(
              <div className='full-review-profile' key={review.id} >
                <div className='movie-review-container'>
                  <img className="image-movie" alt="img de movie" src={review.movie.poster}/>
                  <a href={`/movie/${review.movie.id}`} className="link-movie">
                    <p className="movie-review-title">{review.movie.title}</p>
                  </a>
                </div>
                <div className='container-review-profile'>
                  <p>{review.text }</p>
                  {Array.from(Array(review.stars), (e, i) => {
                    return  <AiFillStar className='icon' key={i}></AiFillStar>
                  })}
                  {Array.from(Array(5 - review.stars), (e, i) => {
                    return <AiOutlineStar className='icon' key={i}></AiOutlineStar>
                  })}
                </div>
              </div>
            );
          })}
        </div>   
      </div>
    </div>
  )}

export default Profile;