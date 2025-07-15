import React, {useState, useEffect} from 'react'
import Main from './Main'
import Box from './box'
import MovieDetails from './movieDetails'

const average = (arr) => {
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

const Content = ({movies, error}) => {
  const [watchedMovie, setWatchedMovie] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  function handleSelectedId(id){
    setSelectedId((i) => i === id ? "" : id);
  }

  function handleClose(){
    setSelectedId(null);
    console.log(watchedMovie);
  }

  function handleAddWatched(movie){
    setWatchedMovie((item)=>[...item, movie]);
    setSelectedId("");
    console.log(movie)
  }

  return (
    <Main>
      <Box>
        {error && <p>{error}</p>}
        {movies && <MovieList movies={movies} onSelected={handleSelectedId}/>}
      </Box>
      <Box>
        {selectedId ? <MovieDetails onClose={handleClose} selectedId={selectedId} onAdd={handleAddWatched}/> :
        <>
          <WatchedSummary watched={watchedMovie}/>
          {watchedMovie.length !== 0 && <WatchedMovies watched={watchedMovie}/>}
        </>}
      </Box>
    </Main>
  )
}

export default Content

function WatchedSummary({watched}){
  const averageImdb = average(watched.map(movie=>movie.imdbID)); //undefined
  const averageUserRating = average(watched.map(movie=>movie.userRating)); //same
  const averageRuntime = average(watched.map(movie => movie.runtime)) //same

  useEffect( function(){
    console.log(averageImdb);
  }, [averageImdb])
    return (
    <div className="summary">
        <h1>movies you watched</h1>
        <div className="list">
            <p>#️⃣ {watched?watched.length:0} movie</p>
            <p>⭐ {averageImdb}</p>
            <p>🌟 {averageUserRating}</p>
            <p>⌛ {averageRuntime} min</p>
        </div>
    </div>
    )
}

function WatchedMovies({watched}){
  return(
    <div>
      {watched.map(item => 
        <div className="movie" key={item.imdbID}>
          <img src={item.poster} alt="image"/>
          <div>
            <h2>{item.title}</h2>
            <div>
              <p>{item.rating}</p>
              <p>{item.userRating}</p>
              <p>{item.runtime}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MovieList({movies, onSelected}){
    return(
      <div>
        {movies.map(movie => <Movie key={movie.imdbID} movie={movie} onSelected={onSelected}/>)}
      </div>
    )
}

function Movie({movie, onSelected}){
  return(
    <div className="movie" onClick={()=>onSelected(movie.imdbID)}>
      <img src={movie.Poster} alt="img"/>
      <div className="movie-description">
        <h2>{movie.Title}</h2>
        <p>📅 {movie.Year}</p>
      </div>
    </div>
  )
}
