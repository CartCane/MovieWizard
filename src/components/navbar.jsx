import React, {useState, useEffect} from 'react';
import MovieList from './MovieList';

const NavBar = ({movies, onSearch, onSelectedId}) => {
  const [isBarActive, setIsBarActive] = useState(false);

  function handleBarToggle(){
    setIsBarActive(i => !i);
  }
  return (
    <div className="nav">
      <Logo />
      <Search onSearch={onSearch} onSelectedId={onSelectedId}/>
      <NumResults movies={movies}/>
      <UserAuth isActive={isBarActive} toggle={handleBarToggle}/>
      <HamburgerBar isActive={handleBarToggle}/>
    </div>
  ) 
}

export default NavBar

function Logo(){
    return(
      <div className="logo">
        <span>🍿</span>
        <h1 className="hide">MovieWizard</h1></div>
    )
}

function Search({onSearch, onSelectedId}){
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(false);
  const apiKey = "dae594e0";

  function handleSearch(e){
    onSearch(e.target.value);
    setSearch(e.target.value);
    setIsActive(true);
    if (e.target.value.length === 0){
      setIsActive(false)
    }
  }

  useEffect( function(){
    const controller = new AbortController();
    async function fetchData(){
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`, {signal: controller.signal});
      const data = await res.json();
      setMovies(data.Search);
    }
    fetchData();
    controller.abort;
  }, [search])
  return (
    <div className="search-bar">
      <input className="search" onChange={handleSearch} onBlur={()=>setTimeout(() => setIsActive(false), 100)} placeholder='Enter movie...'/>
      {isActive && <div className="inline-results  hamburger">
        <MovieList movies={movies} onSelected={onSelectedId}/>
      </div>}
    </div>)
}

function NumResults({movies}){
    return <p className="num-results hide">Found {movies ? movies.length : "0"} results</p>
}

function UserAuth({isActive, toggle}){
  return(
    <>
    <a style={{fontSize: "1.8rem", cursor: "pointer", justifySelf: "end"}} className="hide">Login</a>
    {isActive && <div className="auth">
      <p onClick={toggle}>&#10060;</p>
      <a>Login</a>
    </div>}
    </>
  )
}

function HamburgerBar({isActive}){
  return(
    <div className="hamburger ok" onClick={isActive}>
      <svg xmlns="http://www.w3.org/2000/svg" height="25px" fill="white" viewBox="0 0 448 512">
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
      </svg>
    </div>
  )
}
