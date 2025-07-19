import React, {useState} from 'react'
import Main from './Main'
import Box from './box'
import MovieDetails from './movieDetails'
import MovieList from './MovieList'

const average = (arr) => 
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Content = ({movies, error, onSelectedId, selectedId}) => {
  const [watchedMovie, setWatchedMovie] = useState([]);

  function handleClose(){
    onSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatchedMovie((item)=>[...item, movie]);
    onSelectedId("");
  }

  return (
    <Main>
      <Box hide="hide">
        {error && <p>{error}</p>}
        {movies && <MovieList movies={movies} onSelected={onSelectedId}/>}
      </Box>
      <Box className="hide">
        {selectedId ? <MovieDetails onClose={handleClose} selectedId={selectedId} onAdd={handleAddWatched}/> :
        <>
          <WatchedSummary watched={watchedMovie}/>
          {watchedMovie.length !== 0 && <WatchedMovieList watched={watchedMovie}/>}
        </>}
      </Box>
    </Main>
  )
}

export default Content

function WatchedSummary({watched}){
  const averageImdb = average(watched.map(movie=>movie.imdbRating)); //undefined
  const averageUserRating = average(watched.map(movie=>movie.userRating)); 
  const averageRuntime = average(watched.map(movie => movie.runtime)) 

    return (
    <div className="summary">
        <h2>movies you watched</h2>
        <div>
            <p>
              <span>#️⃣</span>
              <span>{watched?watched.length:0} movie</span>
            </p>
            <p>
              <span>⭐</span>
              <span>{averageImdb.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{averageUserRating.toFixed(2)}</span> 
            </p>
            <p>
              <span>⌛</span>
              <span>{averageRuntime} min</span>
            </p>
        </div>
    </div>
    )
}

function WatchedMovieList({watched}){
  return(
    <ul className="list">
      {watched.map(movie => <WatchedMovies movie={movie}/>)}
    </ul>
  )
}

function WatchedMovies({movie}){
  return(
    <li key={movie.imdbID}>
      <img src={movie.poster} alt="image"/>
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
    </li>
  )
}
