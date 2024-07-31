import { Link } from 'react-router-dom';
import classes from './MovieResults.module.css';
import { motion } from 'framer-motion';
const MovieResults = ({results}) =>{
    return(
        <div className={classes.main}>
            {results.map((result)=>(
                <div>
                    <Link to={result.imdbID}>
                        <motion.img initial={{scale:0.9}} whileHover={{scale:1.1}} src={result.Poster} alt={result.Title}></motion.img>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default MovieResults;