import { Await, defer, useRouteLoaderData } from "react-router-dom"
import MovieDescription from "./MovieDescription"
import { Suspense } from "react";

const Movie=() =>{
    const data = useRouteLoaderData('movie-description');
    console.log(data);
    return(
        <Suspense fallback={<p style={{textAlign:'center',color:'white'}}>Loading...</p>}>
            <Await resolve={data.value}>
                {(value)=><MovieDescription movie={value}></MovieDescription>}
            </Await>
        </Suspense>
    )
}

export async function loaderData({request,params}){
    const val = params.id;
    const response = await fetch(`https://www.omdbapi.com/?i=${val}&apikey=f967a6aa`);
    if(!response.ok){
        console.log("error");
    }
    const json = await response.json();
    return defer({
        value: json
    });
}


export default Movie;