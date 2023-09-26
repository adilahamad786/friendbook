import classes from './FollowButton.module.css';
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { useContext, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rightbarUpdateActions } from '../../store/rightbarUpdateSlice';
import CircularProgress from '@mui/material/CircularProgress';

const Button = (props) => {
  const { token, setLogedOut } = useContext(AuthContext);
  const [followed, setFollowed] = useState("");
  const {isLoading, error: sendFollowUnfollowRequestError , sendRequest: sendFollowUnfollowRequest } = useHttp();
  const {error: fetchFollowedStatusError, sendRequest: fetchFollowedStatus } = useHttp();
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.user._id.toString());

  const hasCurrentUser = currentUserId === props.userId;

  const clickHandler = () => {
    sendFollowUnfollowRequest({
      url : `/api/user/follow-unfollow/${props.userId}`,
      method : "PUT",
      headers : {
        Authorization : token
      }
    }, (resData) => {
      setFollowed(resData.hasFollow);
      dispatch(rightbarUpdateActions.update());
    })
  }

  useEffect(() => {
    if (!hasCurrentUser) {
      fetchFollowedStatus({
        url : `/api/user/follow-status/${props.userId}`,
        headers : {
          Authorization : token
        }
      }, (resData) => setFollowed(resData.hasFollowed));
    }
  }, [hasCurrentUser, fetchFollowedStatus, token, setFollowed, props.userId]);

  useEffect(() => {
    if (sendFollowUnfollowRequestError || fetchFollowedStatusError) {
      alert(sendFollowUnfollowRequestError.message || fetchFollowedStatusError.message)
      if (sendFollowUnfollowRequestError.errorType === "unauthorized" || fetchFollowedStatusError.errorType === "unauthorized") {
        setLogedOut()
      }
    }
  }, [sendFollowUnfollowRequestError, fetchFollowedStatusError, setLogedOut]);

  return (
    <button disabled={hasCurrentUser || isLoading} onClick={clickHandler} className={`${classes.btn} ${followed ? classes.unfollow : ""}`}>
      { isLoading ? <CircularProgress color="inherit" size="1rem"/> : followed ? "Unfollow" : "Follow" }
    </button>
  );
}

export default Button;