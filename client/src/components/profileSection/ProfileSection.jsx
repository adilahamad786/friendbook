import classes from "./ProfileSection.module.css";
import {
  FacebookTwoTone,
  Instagram,
  Twitter,
  LinkedIn,
  Pinterest,
  Place,
  EmailOutlined,
  MoreVertOutlined
} from '@mui/icons-material';
import FollowButton from '../followButton/FollowButton';
import MoreUserInfo from "../moreUserInfo/MoreUserInfo";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useSelector } from "react-redux";
import noProfilePicture from "../../assets/noProfilePicture.png";
import noCoverPicture from "../../assets/noCoverPicture.png";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";

const ProfileSection = () => {
  const userId = useParams().id;
  const [showMore, setShowMore] = useState(false);
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState(currentUser);
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: fetchUserError, sendRequest : fetchUser } = useHttp();

  const otherUser = userId !== currentUser._id;

  const showMoreHandler = () => {
    setShowMore(preState => !preState);
  }

  useEffect(() => {
    if (otherUser) {
      fetchUser({
        url : `/api/user?userId=${userId}`,
        headers : {
          Authorization : token
        }
      }, (resData) => setUser(resData));
    }
    else {
      setUser(currentUser);
    }
  }, [otherUser, currentUser, userId, fetchUser, token]);

  useEffect(() => {
    if (fetchUserError) {
      alert(fetchUserError.message);
      if (fetchUserError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [fetchUserError, setLogedOut]);

  return (
    <section className={classes.profileSection}>
      <div className={classes.coverPicture}>
        <img
          src={user.coverPictureUrl ? user.coverPictureUrl : noCoverPicture}
          alt="CoverPicture"
        />
      </div>
      <img
        className={classes.profilePicture}
        src={user.profilePictureUrl ? user.profilePictureUrl : noProfilePicture}
        alt="profilePicture"
      />
      <div className={classes.about}>
        <div className={classes.left}>
          <Link className={classes.icons}>
            <FacebookTwoTone />
          </Link>
          <Link className={classes.icons}>
            <Instagram />
          </Link>
          <Link className={classes.icons}>
            <Twitter />
          </Link>
          <Link className={classes.icons}>
            <LinkedIn />
          </Link>
          <Link className={classes.icons}>
            <Pinterest />
          </Link>
        </div>
        <div className={classes.center}>
          <span className={classes.username}>{user.username.toUpperCase()}</span>
          <span className={classes.userDescription}>{user.description}</span>
          { otherUser && <FollowButton className={classes.followButton} userId={user._id.toString()} />}
        </div>
        <div className={classes.right}>
          <Link className={classes.icons}>
            <div className={classes.location}>
              <Place />
              <span>{user.location}</span>
            </div>
          </Link>
          <Link className={classes.icons}>
            <EmailOutlined />
          </Link>
          <Link className={classes.icons}>
            <MoreVertOutlined onClick={showMoreHandler} />
          </Link>
        </div>
      </div>
      { showMore && <MoreUserInfo age={user.age} gender={user.gender} relationship={user.relationship}/> }
    </section>
  );
};

export default ProfileSection;
