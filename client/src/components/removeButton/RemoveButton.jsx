import classes from './RemoveButton.module.css';
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { useContext, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { rightbarUpdateActions } from '../../store/rightbarUpdateSlice';
import CircularProgress from '@mui/material/CircularProgress';

const FriendButton = (props) => {
  const { token, setLogedOut } = useContext(AuthContext);
  const [removed, setRemoved] = useState(false);
  const {isLoading, error: sendFollowUnfollowRequestError , sendRequest: sendFollowUnfollowRequest } = useHttp();
  const dispatch = useDispatch();

  const clickHandler = () => {
    sendFollowUnfollowRequest({
      url : `/api/user/remove/${props.userId}`,
      method : "PUT",
      headers : {
        Authorization : token
      }
    }, (resData) => {
      setRemoved(resData.removed);
      dispatch(rightbarUpdateActions.update());
    })
  }

  useEffect(() => {
    if (sendFollowUnfollowRequestError) {
      alert(sendFollowUnfollowRequestError.message)
      if (sendFollowUnfollowRequestError.errorType === "unauthorized") {
        setLogedOut()
      }
    }
  }, [sendFollowUnfollowRequestError, setLogedOut]);

  return (
    <button onClick={clickHandler} disabled={removed || isLoading} className={`${classes.btn} ${removed ? classes.removed : ""}`}>
      { isLoading ? <CircularProgress color="inherit" size="1rem"/> : removed ? "Removed" : "Remove"}
    </button>
  );
}

export default FriendButton;