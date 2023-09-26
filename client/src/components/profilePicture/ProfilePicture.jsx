import classes from './ProfilePicture.module.css';
import noProfilePicture from '../../assets/noProfilePicture.png';


const ProfilePicture = (props) => {
  return (
    <img className={classes.profile} src={props.imageUrl ? props.imageUrl : noProfilePicture } alt="ProfilePicture" />
  );
}

export default ProfilePicture;