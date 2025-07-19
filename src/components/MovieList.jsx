import React from 'react'

const MovieList = ({movies, onSelected}) => {
  return (
    <div className="list">
      {movies?.map(movie => <Movie key={movie.imdbID} movie={movie} onSelected={onSelected}/>)}
    </div>
  )
}

export default MovieList

function Movie({movie, onSelected}){
  return(
    <li onClick={()=>onSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title}/>
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span> 
        </p>
      </div>
    </li>
  )
}