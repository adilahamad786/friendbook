import classes from "./Login.module.css";
import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import validator from "validator";
import AuthContext from "../../context/AuthContext";
import { userActions } from "../../store/userSlice";
import getGoogleOAuthUrl from "../../utils/getGoogleOAuthUrl";
import google from "../../assets/google.png";
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {
  const {
    value: email,
    setValue: setEmail,
    isValid: emailIsValid,
    hasError: hasEmailError,
    setFocus: setEmailFocus,
  } = useInput((value) => validator.isEmail(value));
  const {
    value: password,
    setValue: setPassword,
    isValid: passwordIsValid,
    hasError: hasPasswordError,
    setFocus: setPasswordFocus,
  } = useInput((value) => value.length >= 6);

  const [formIsValid, setFormIsValid] = useState(false);

  const { isLoading: isFetching, error: fetchUserError, sendRequest: fetchUser } = useHttp();
  const { sendRequest: fetchReloadUser } = useHttp();
  const { setLogedIn } = useContext(AuthContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true)
    }
    else {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchReloadUser({
        url : '/api/user/me',
        headers : {
          Authorization : token
        }
      }, (userData) => {
        dispatch(userActions.replace(userData));
        setLogedIn(token);
      });
    }
  }, [setLogedIn, fetchReloadUser, dispatch]);
 
  const submitHandler = (e) => {
    e.preventDefault();
    const userFromData = { email, password };

    fetchUser({ 
        url : '/api/user/login',
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(userFromData)
      },
      (resData) => {
        // Setting user data inside redux store
        dispatch(userActions.replace(resData.user));
        setLogedIn(resData.token);
        navigate('/');
      }
    );
  };

  useEffect(() => {
    if (fetchUserError) {
      alert(fetchUserError.message);
    }
  }, [fetchUserError]);

  return (
    <section className={classes.login}>
      <div className={classes.loginWrapper}>
        <div className={classes.about}>
          <h3 className={classes.loginLogo}>Friendbook</h3>
          <span className={classes.loginDescription}>
            Connect with people and the world around you on Friendbook.
          </span>
        </div>
        <div className={classes.formBox}>
          <form onSubmit={submitHandler} className={classes.loginForm}>
            <h4>Login</h4>
            <input
              onChange={setEmail}
              onFocus={setEmailFocus}
              className={classes.loginInput}
              type="email"
              placeholder="Enter your email"
              required
            />
            {hasEmailError && (
              <span className={classes.invalidMessage}>
                Please enter a valid email!
              </span>
            )}
            <input
              onChange={setPassword}
              onFocus={setPasswordFocus}
              className={classes.loginInput}
              type="password"
              placeholder="Enter your password"
              required
            />
            {hasPasswordError && (
              <span className={classes.invalidMessage}>
                Password should contain atleast 6 characters!
              </span>
            )}
            <button disabled={ !formIsValid || isFetching } className={classes.loginButton}>
              {isFetching ? <CircularProgress color="inherit" size="1.6rem"/> : "Log In" }
            </button>
          </form>
          <a href={getGoogleOAuthUrl()} className={classes.googleBtn}>
            <img src={google} alt="" />
            <span>Login With Google</span>
          </a>
          <Link className={classes.forgot} to="/forgot-password">
            Forgot Password?
          </Link>
          <Link className={classes.registerButtonLink} to="/register">
            <button className={classes.registerButton}>
              Create a New Account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
