import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useContext } from 'react';
import { Context } from './Contexto';
import RatingStars from './RatingStars';
import axios from 'axios';
import MovieService from '../api/movieService';
import '../styles/Movie.css';

 const Movie = () => {
  const navigate = useNavigate();
  const [contextState, setContextState] = useContext(Context);  
  const [reviewMade, setReviewMade] = useState(false);
  const {id} = useParams();
  const isLogged = !!localStorage.getItem("token");
  
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    description: "",
    poster: "",
    score: 0,
    reviews: [],
    categories: []
  })
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  })

  axios.defaults.headers['authorization'] = localStorage.getItem('token');

  useEffect(() => {
    if (isLogged) {
      MovieService.getUser()
      .then(response => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        })
      }).catch(error => {
        console.log(error)
      });
    }}, []
    )

  useEffect(() => {
    MovieService.getContentId(id)
    .then(response => {
      setMovie({
        id : response.data.id,
        title: response.data.title,
        description: response.data.description,
        poster: response.data.poster,
        score: response.data.score,
        reviews: setFirstReview(response.data.reviews, user.id),
        categories: response.data.categories,   
      })
    }).catch(error => {
      console.log(error)
      
        navigate("/invalidRoute"); //aca va la pagina de not found
      
    });
  }, [user, reviewMade]
  )

  const setFirstReview = (listaReviews, id) => {
    let reviewID= listaReviews.find(review => review.user.id === id);
    let first= '';
    if (!!reviewID){
      setReviewMade(true);
      first = reviewID;
      listaReviews.sort(function(x,y){ return x === first ? -1 : y === first ? 1 : 0; });
    }
    return listaReviews;
  }
   
  return (
      <>
        <div className='movie-page'>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-10 container">
            <div className="card"  >
              <div className="movie-info-container">
                <div className="top">
                  <div className="img-1">
                    <img src={movie.poster} alt="movie-poster"/>
                  </div>
                  <div className="general-info">
                    <h2>{movie.title}</h2>
                    <div>
                      <span>Score: </span>
                      <span>{movie.score}/5</span>
                    </div>
                    <div>
                      <span>Categories: </span>
                      <span>{movie.categories.map((  cat) => {
                        return <span key={cat.id}>{cat.name} </span>
                      })}</span>
                    </div>  
                  </div>
                </div>
                <div className="movie-info">
                  <p className='movie-description'>
                    {movie.description}
                  </p>
                </div>
              </div>
              <div className="img-2">
                <img src={movie.poster} alt="movie-poster"></img>
              </div>
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-10 rate-review-section' >                                                              
            <h1 className='rate-review-title'>Rate and review</h1>
            <div className='containerRR' onClick={() => {setContextState({
  bool: true,
  message: "LOGIN IF YOU WANNA MAKE A REVIEW"
})}} >
              <RatingStars movieID={movie.id} setMadeReview={setReviewMade} />
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-10 reviews-section'>
            <h1 className='title-critic'> Critics Review for {movie.title} </h1>
            <div className='reviews-grid'>
              {movie.reviews.map((review) => {
                return(
                  <div className='full-review' key={review.id}>
                    <div className='container-review' style={{          
                      border: isLogged && (review.user.email === user.email) ? '8px solid gold': '8px solid rgba(101, 1, 1, 0.882)',
                      }}>
                      <p>{review.text }</p>
                      {Array.from(Array(review.stars), (e, i) => {
                        return  <AiFillStar className='icon' key={i}></AiFillStar>
                      })}
                      {Array.from(Array(5 - review.stars), (e, i) => {
                        return <AiOutlineStar className='icon' key={i}></AiOutlineStar>
                      })}
                    </div>
                    <div className='profile-review' >
                      <a href={`/profile/${review.user.id}`} ><img alt='imagen-profile' className='imgProfile' src={review.user.image}  style={{          
                        border: isLogged && review.user.id === user.id ? '5px solid gold': '5px solid rgba(101, 1, 1, 0.882)',
                        }} />
                      </a>
                      <div className='user-review-content'>
                        <a href={`/profile/${review.user.id}`} className="review-user-name">{review.user.name} </a>
                        <p className="review-user-email">{review.user.email}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  }

  export default Movie;
