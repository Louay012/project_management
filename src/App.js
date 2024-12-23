import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';
import Login from './login.jsx';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import  { Toaster } from 'react-hot-toast';
import Signup from './signup.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
])
function App() {
  return <>
    
      <Toaster/>
      <RouterProvider router={router} ></RouterProvider>
    
      </>;
}

export default App;