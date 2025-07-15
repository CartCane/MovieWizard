import React, {useState, useEffect} from 'react'
import StarRating from './stars.jsx';

const MovieDetails = ({onClose, selectedId, onAdd}) => {
  const [currentMovie, setCurrentMovie] = useState({});
  const [userRating, setUserRating] = useState();
  const apiKey = "dae594e0";

  useEffect(function(){
    async function fetchMovie(){
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
        const data = await res.json();
        setCurrentMovie(data);
        console.log(data);
      } catch(err){
        console.log(err)
      }
      
    }
    fetchMovie();
  }, [selectedId])

  const {Title: title, Poster:poster, Released:released,
    Genre:genre, imdbRating, Runtime: runtime, Plot:plot, Actors: actors, Director: director
  } = currentMovie;

  function handleAdd(){
    const newWatchedMovie = {title, poster, imdbRating, userRating, runtime};
    onAdd(newWatchedMovie);
  }

  function handleRating(rating){
    setUserRating(rating);
  }

  return (
    <>
      <div className="movie-details">
        <button className="btn-back" onClick={onClose}>&larr;</button>
        <img src={poster} alt='image'/>
        <div>
          <h2>{title}</h2>
          <p><span>{released}</span> | <span>{runtime}</span></p>
          <p>{genre}</p>
          <p>⭐ {imdbRating} IMDb rating</p>
        </div>
      </div>
      <div className="rating">
        <StarRating maxRating={10} size={20} onRating={handleRating}/>
        <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
      </div>
      <div className="plot"> 
        <p className="desc">{plot}</p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </div>
    </>
  )
}

export default MovieDetails
