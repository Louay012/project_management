import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';
import Login from './login.jsx';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Task from './tasks.jsx';
import  { Toaster } from 'react-hot-toast';
import Signup from './signup.jsx';
import Project from './project.jsx';
import Schedule from './Schedule.jsx';
import Teams from './teams.jsx';
import Team from './team.jsx'
import Menu from './Menu.jsx';
import Profile from './profile.jsx';
import { UserProvider } from './UserContext'; 
import AboutPage from './about.jsx';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from './not-authorized.jsx';

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
  {
    path:"/tasks",
    element:<ProtectedRoute><Task/></ProtectedRoute>
  },
  {
    path:"/schedule",
    element:<ProtectedRoute><Schedule/></ProtectedRoute>
  },
  {
    path:"/project/:project_id",
    element:<ProtectedRoute><Project /></ProtectedRoute>
  },
  {
    path:"/team/:team_id",
    element:<ProtectedRoute><Team /></ProtectedRoute>
  },
  {
    path:"/teams",
    element:<ProtectedRoute><Teams/></ProtectedRoute>
  },
  {
    path:"/menu",
    element:<ProtectedRoute><Menu/></ProtectedRoute>
  },
  
  {
    path:"/profile",
    element:<ProtectedRoute><Profile/></ProtectedRoute>
  },
  {
    path:"/about",
    element:<AboutPage/>
  },
  {
    path:"/not-authorized",
    element:<ErrorPage/>
  },
])
function App() {
  return (
    <UserProvider> 
      <Toaster/>
      <RouterProvider router={router} ></RouterProvider>
      </UserProvider> 
  );
}

export default App;