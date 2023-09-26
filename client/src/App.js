import './style.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LeftbarSection from './components/leftbarSection/LeftbarSection';
import RightbarSection from './components/rightbarSection/RightbarSection';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import NotFound from './pages/error/NotFound';
import About from './pages/about/About';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AccountVerification from './pages/accountVerification/AccountVerification';
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate';
import AuthContext from './context/AuthContext';
import { useSelector } from 'react-redux';

function App() {
  const { isLogedIn } = useContext(AuthContext);
  const { profilePictureUrl, username } = useSelector(state => state.user);

  const Layout = () => {
    const { theme } = useContext(ThemeContext);

    return (
      <div className={`theme-${theme ? 'dark' : 'light'}`}>
        <Navbar user={{profilePictureUrl, username}}/>
        <div style={{display : "flex"}}>
          <LeftbarSection user={{profilePictureUrl, username}} />
          <Outlet />
          <RightbarSection />
        </div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path : '/',
      element : isLogedIn ? <Layout /> : <Login />,
      children : [
        {
          path : '/',
          element : <Home />
        },
        {
          path : '/profile/:id',
          element : <Profile />
        },
        {
          path : '/profile/update',
          element : <ProfileUpdate />
        }
      ]
    },
    {
      path : '/login',
      element : <Login />
    },
    {
      path : '/register',
      element : <Register />
    },
    {
      path : '/verification',
      element : <AccountVerification />
    },
    {
      path : '/forgot-password',
      element : <ForgotPassword />
    },
    {
      path : '/reset-password',
      element : <ResetPassword />
    },
    {
      path : "/about",
      element : <About />
    },
    {
      path : "*",
      element : <NotFound />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
