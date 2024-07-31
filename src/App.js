import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import { loaderData } from './Movie/Movie';
import Movie from './Movie/Movie';
function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Root></Root>,
      children:[
        {
          index: true,
          element:<Home></Home>
        },
        {
          path: ':id',
          id:'movie-description',
          loader:loaderData,
          element:<Movie></Movie>
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
