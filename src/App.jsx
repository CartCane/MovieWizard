import React, {useState, useEffect} from 'react'
import NavBar from './components/navbar'
import Content from './components/content'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const apiKey = "dae594e0";

  function handleSearch(word){
    setSearch(word);
  }

  function handleSelectedId(id){
    setSelectedId((i) => i === id ? "" : id);
    console.log(id);
  }

  useEffect(()=>{
    if (search.length < 3) return;
    const controller = new AbortController();
    async function fetchMovie(){
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`, {signal: controller.signal})
        if(!res.ok) throw new Error ("Something went wrong with network!")
        const data = await res.json();
        if(!data) throw new Error ("No data to process");
        setMovies(data.Search);
      }
      catch(err){
        if (err.name !== "AbortError"){
          setError(err.message);
        }
      }
    }
    fetchMovie();
    return function(){
      controller.abort();
    }
  }, [search])

  return (
    <div>
      <NavBar movies={movies} onSearch={handleSearch} onSelectedId={handleSelectedId}/>
      <Content movies={movies} error={error} onSelectedId={handleSelectedId} selectedId={selectedId}/>
    </div>
  )
}

export default App
