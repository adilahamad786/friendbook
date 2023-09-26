import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';
import image from "../../assets/404.png";

const NotFound = () => {
  return (
    <div className={classes.container}>
        <div className={classes.message}>
            <img src={image} referrerPolicy='referrer' alt="NotFound" />
            <h1 className={classes.title}>Page Not Found!</h1>
            <Link to="/" className={classes.link}>
                Goto Home Page
            </Link>
        </div>
    </div>
  )
}

export default NotFound