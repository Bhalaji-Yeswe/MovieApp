import { Link } from "react-router-dom";
import classes from "./MovieList.module.css";
import { motion } from "framer-motion";
const MovieList = ({heading,movieList}) =>{
    return(
        <div>
            <h3>{heading}</h3>
                <div className={classes['movie-list']}>
                    {movieList.map(movie=>(
                        <Link to={movie.imdbID}>
                            <motion.img whileHover={{scale:1.2, transition: {duration:0.2}}} key={movie.imdbId} src={movie.Poster}></motion.img>
                        </Link>
                    ))}
                </div>
        </div>
    )
}
export default MovieList;