import React from 'react'
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import MovieService from '../api/movieService';
import axios from 'axios';
import '../styles/RatingStars.css';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const RatingStars = ({movieID, setMadeReview}) => {

  const [data, setData] = useState({
    text: "",
    stars: 0,
  });


const clearFields = () => {

  setCurrentValue(0);
setData({
  text: "",
  stars: 0
})
}

  const addReview = (event) => {
    event.preventDefault();
    MovieService.postReview(data, movieID)
        .then( _ => {
            setData(prevState => ({ ...prevState }));
            setMadeReview(true)
            setReviewMade(true)
            clearFields()
        }).catch( error => {
          console.log(error.response.data.message)
           setReviewError(true)
        });
  };

  const [reviewError, setReviewError] = useState (false)
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewMade, setReviewMade] = useState(false)
  const stars = Array(5).fill(0)

  const isLogged = !!localStorage.getItem("token");
  
  const handleClick = (e, value) => {
    setCurrentValue(value)
    e.preventDefault();
    setData({
      text: data.text,
      stars: value
    })
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };
  
  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  }

  axios.defaults.headers['authorization'] = localStorage.getItem('token');
  
  return (
    <div className='rating-container' style={{  
      pointerEvents: !isLogged  ? 'none' : 'auto',
    }}>
      <form onSubmit={(event) => {addReview(event)}}>
      <h2> Select score </h2>
      <div className='stars'>
      <button className="btn-stars" onClick={(e) => handleClick(e, 0)}> None </button>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={(e) => handleClick(e, index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea value={data.text} onChange={handleChange("text")} cols="500"
        placeholder="What did you think of the movie?"
        style={styles.textarea}
        required
      />
      <div>
      <input type="submit" className='button-review' />
      <p> {reviewError && <p style={{color: "red"}}>Error: You have already made a review!</p>}</p>
      <p> {reviewMade && <p style={{color: "gold"}}>Review made succesfully!</p>}</p>
      </div>
      </form>
    </div>
  );
}

const styles = {
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 400
    },

  };
  
  export default RatingStars;