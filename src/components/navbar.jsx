import React from 'react'

const NavBar = ({movies, onSearch}) => {
  return (
    <div className="nav">
      <Logo />
      <Search onSearch={onSearch}/>
      <NumResults movies={movies}/>
    </div>
  )
}

export default NavBar

function Logo(){
    return <p>InfoBar</p>
}

function Search({onSearch}){
  function handleSearch(e){
    onSearch(e.target.value);
  }
  return <input className="search" onChange={handleSearch} placeholder='Enter movie...'/>
}

function NumResults({movies}){
    return <p>Found {movies ? movies.length : "0"} results</p>
}
