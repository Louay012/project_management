import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';

import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import  { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  
])
function App() {
  return <>
    
      <Toaster/>
      <RouterProvider router={router} ></RouterProvider>
    
      </>;
}

export default App;