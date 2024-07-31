import { configureStore, createSlice } from "@reduxjs/toolkit";
import { movieList } from "../Data/Data_MovieList";
const movieSlice = createSlice({
    name:"movieSlice",
    initialState: {favoriteMovies: movieList},
    reducers:{
        addMovie(state,action){
            state.favoriteMovies.push(action.payload);
        },
        removeMovie(state,action){
            state.favoriteMovies = state.favoriteMovies.filter(movie => movie.imdbID!==action.payload.id)
        }
    }
});

const store = configureStore({
    reducer: movieSlice.reducer
});

export const actions = movieSlice.actions;
export default store;