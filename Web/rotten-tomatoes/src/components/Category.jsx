import MovieService from "../api/movieService.js";
import MovieModel from './MovieModel.jsx';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/Category.css';

const Category = () => {

  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  const [category, setCategory] = useState({
    name: ""
  })

  useEffect( () => {
    MovieService.getCategoriesById(id)
    .then(response => {
      setMovies(response.data.result.movies)
      setCategory({
        name: response.data.result.nameCategory,
      })
    }).catch(error => {
      console.log(error)
    });
  }, [id]
  );


  return (
    <>
      <div className='container-category'>
        <div className='title-category'>

          <p className="name-category"> {category.name}</p>
          <p className="lenght-result">({movies.length} results)</p>

        </div> 
        <div className='movie-container'>
          {movies.map((movie, idx) => {
            return <MovieModel key={movie.id} movie={movie} />
          })}
        </div>
      </div>
    </>
  )
}

export default Category;