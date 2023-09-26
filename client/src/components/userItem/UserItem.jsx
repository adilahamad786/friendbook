import classes from "./UserItem.module.css";
import { Link } from 'react-router-dom';
import ProfilePicture from '../profilePicture/ProfilePicture';

const FollowUser = (props) => {
  const { _id: userId, profilePictureUrl, username } = props.user;
  return (
    <Link to={`/profile/${userId.toString()}`} className={classes.userInfo}>
      <ProfilePicture imageUrl={profilePictureUrl}/>
      <span>{username.toUpperCase()}</span>
    </Link>
  );
};

export default FollowUser;
