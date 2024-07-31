import { useDispatch, useSelector } from "react-redux";
import classes from "../Movie/MovieDescription.module.css";
import { motion } from "framer-motion";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";

const MovieDescription = ({movie}) => {
    const paraInitial = {opacity:0};
    const paraAnimations = {opacity:1};
    const paraTransitions = {delay:0.2};
    const navigate = useNavigate();
    const container = {
        show:{
            opacity: 1,
            transition:{
                staggerChildren: 1
            }
        }
    }
    const dispatch = useDispatch();
    const item = {
        hidden: {opacity: 0},
        show: {opacity: 1}
    }
    const favoriteMovies = useSelector(state => state.favoriteMovies);
    const isAFavoriteMovie = favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID===movie.imdbID);
    console.log(isAFavoriteMovie);
    function addToFavorites(){
        dispatch(actions.addMovie({"Title":movie.Title,"Year":movie.Year,"imdbID":movie.imdbID,"Type":movie.Type,"Poster":movie.Poster,"favorites":true}));
        navigate("/");
    }
    function removeFromFavorites(){
        dispatch(actions.removeMovie({"id":movie.imdbID}));
        navigate("/");
    }
    return(
        <motion.div animate={{ x: 100 }} transition={{ type: "spring"}} className={classes.main}>
            <h1>{movie.Title}</h1>
            <div className={classes.content}>
                <motion.img animate={{opacity:[0,0.5,1]}} transition={{delay:0.3}} src={movie.Poster}></motion.img>
                <div className={classes.paras}>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Genre: {movie.Genre}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Director: {movie.Director}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Released: {movie.Released}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Language: {movie.Language}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Plot: {movie.Plot}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Box Office: {movie.BoxOffice}</motion.p>
                    <motion.p initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Runtime: {movie.Runtime}</motion.p>
                    <motion.div variants={container} initial="hidden" animate="show">
                        <motion.b initial={paraInitial} animate={paraAnimations} transition={paraTransitions}>Rating</motion.b>
                        {movie.Ratings.map(rating=> (
                            <motion.li variants={item} id={rating.Source}>{rating.Source} - {rating.Value}</motion.li>
                        ))}
                    </motion.div>
                    <motion.button 
                        whileHover={{backgroundColor:'#f23ef1'}} 
                        onClick={isAFavoriteMovie ? removeFromFavorites: addToFavorites}
                    >{isAFavoriteMovie ? 'Remove from favorites' : 'Add to Favorites'}</motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default MovieDescription;