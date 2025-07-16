import React from 'react'

const NavBar = ({movies, onSearch}) => {
  return (
    <div className="nav">
      <Logo />
      <Search onSearch={onSearch}/>
      <NumResults movies={movies}/>
      <UserAuth />
    </div>
  )
}

export default NavBar

function Logo(){
    return(
      <div className="logo">
        <span>🍿</span>
        <h1>MovieWizard</h1></div>
    )
}

function Search({onSearch}){
  function handleSearch(e){
    onSearch(e.target.value);
  }
  return <input className="search" onChange={handleSearch} placeholder='Enter movie...'/>
}

function NumResults({movies}){
    return <p className="num-results">Found {movies ? movies.length : "0"} results</p>
}

function UserAuth(){
  return(
    <div className="auth">
      <a>Login</a>
    </div>
  )
}
