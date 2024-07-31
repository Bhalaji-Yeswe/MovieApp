import { useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import MovieList from './MovieList/MovieList';
import classes from './Home.module.css';
import MovieResults from './MovieResult/MovieResults';
import Loader from './Loader/Loader';
import { useSelector } from 'react-redux';
const Home = () =>{
    const movieList = useSelector(state => state.favoriteMovies);
    const [isLoading,setIsLoading] = useState(false);
    const [searchMovie,setSearchMovie] = useState([]);
    const inputRef = useRef();
    const [movieName,setMovieName] = useState('');
    const returnedname = useDebounce(movieName,300);
    
    useEffect(()=>{
        async function getMovieList(){
            setIsLoading(true);
            const response = await fetch(`https://www.omdbapi.com/?s=${returnedname}&apikey=f967a6aa`);
            if(!response.ok){
                console.log(response.statusText);
            }
            const json = await response.json();
            console.log(json.Search);
            setSearchMovie(json.Search);
            setIsLoading(false);
        }
        if(returnedname.length>0){
            getMovieList();
        }
    },[returnedname]);

    function inputHandler(){
        setMovieName(inputRef.current.value);
    }
    
    let checkNotValidMovie = (!searchMovie || searchMovie.length===0)
    return(
        <div className={classes.main}>
            <input onChange={inputHandler} ref={inputRef} placeholder='Search your movies'></input>
            <MovieList heading="Favorites" movieList={movieList}></MovieList>
            {checkNotValidMovie && <p>Search your movies...</p>}
            {searchMovie && !isLoading ? <MovieResults results={searchMovie}></MovieResults> : <Loader></Loader>}
            
        </div>
    )
}

export default Home;