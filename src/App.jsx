import React, {useState, useEffect} from 'react'
import NavBar from './components/navbar'
import Content from './components/content'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const apiKey = "dae594e0";

  function handleSearch(word){
    setSearch(word);
  }

  useEffect(()=>{
    if (search.length < 3) return;
    async function fetchMovie(){
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
        if(!res.ok) throw new Error ("Something went wrong with network!")
        const data = await res.json();
        if(!data) throw new Error ("No data to process");
        setMovies(data.Search);
        console.log(data);
      }
      catch(err){
        console.log(err);
        setError(err.message);
      }
    }
    fetchMovie();
  }, [search])

  return (
    <div>
      <NavBar movies={movies} onSearch={handleSearch}/>
      <Content movies={movies} error={error}/>
    </div>
  )
}

export default App
