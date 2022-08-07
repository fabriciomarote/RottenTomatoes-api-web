import '../styles/MovieModel.css';

const MovieModel = (props) => {

    const { movie } = props;
    
    return (
      <>
        <div className='movie-card-content'>
          <a href={`/movie/${movie.id}`} className="link-movie">
            <div className='movie-poster'>
               <img className="poster" src={movie.poster} alt=""/>
            </div>
             <div className='movie-title'>
              <p className="m-title">{movie.title}</p>
            </div> 
          </a>      
        </div>
      </>
    )
}

export default MovieModel;