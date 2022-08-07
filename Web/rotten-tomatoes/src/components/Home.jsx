import React, { useEffect, useState } from 'react'
import MovieModel from '../components/MovieModel.jsx';
import MovieService from '../api/movieService';
import '../styles/Home.css';

const Home=() => {

  const [top, setTop] = useState([]);
  const [latest, setLatest] = useState([]);
  
  useEffect(() => {
    MovieService.getTop()
    .then(response => {
      setTop(response.data.result)
    }).catch(error => {
      console.log(error)
    });
  }, []
  );

  useEffect(() => {
    MovieService.getLatest()
    .then(response => {
      setLatest(response.data.result)
    }).catch(error => {
      console.log(error)
    });  
  }, []
  );

  return (
    <>
      <div className='home-container'>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content-movies">
          <div className='title'>
            <h4>Top Movies</h4>
          </div>
          <div className='movie-container'>
            {top.map((movie, idx) => {
              return <MovieModel key={movie.id} movie={movie} />
            })}
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content-movies">
          <div className='title'>
            <h4>Latest Movies</h4>
          </div>
          <div className='movie-container'>
            {latest.map((movie, idx) => {
              return <MovieModel key={movie.id} movie={movie} />
            })}
          </div>
        </div>  
      </div>
    </>
  )
}

export default Home;