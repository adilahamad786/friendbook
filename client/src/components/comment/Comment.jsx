import classes from "./Comment.module.css";
import ProfilePicture from "../profilePicture/ProfilePicture";
import Backdrop from "../backdrop/Backdrop";
import Options from "../options/Options";
import { MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import { useState } from 'react';
import { useSelector } from "react-redux";
import CommentUpdate from "../commentUpdate/CommentUpdate";

const Comment = (props) => {
  const { _id: commentId, owner, message, createdAt } = props.data;
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdateComment, setShowUpdateComment] = useState(false);
  const currentUserId = useSelector(state => state.user._id);

  const timeago = moment(new Date(createdAt)).fromNow();
  const hasOwnComment = owner._id === currentUserId;

  const showMenuHandler = () => {
    setShowOptions(showOptions => !showOptions && hasOwnComment);
  }

  const showUpdateCommentOption = () => {
    setShowUpdateComment(state => !state);
  }

  const closeBackdrop = () => {
    setShowOptions(false);
    setShowUpdateComment(false);
  }

  return (
    <div className={classes.user}>
      <div className={classes.userInfo}>
        <ProfilePicture className={classes.profilePicture} imageUrl={owner.profilePictureUrl}/>
        <div className={classes.message}>
          <div className={classes.owner}>
            <span>{owner.username.toUpperCase()}</span>
            <span className={classes.time}>{timeago}</span>
          </div>
          <p>{message}</p> 
        </div>
      </div>
      <div className={classes.menu}>
        { <MoreHoriz onClick={showMenuHandler} /> }
        { showOptions && <div className={classes.options}><Options update={showUpdateCommentOption} id={commentId.toString()} delete={props.delete} onClose={showMenuHandler}/></div> }
        { showUpdateComment && <div className={classes.commentUpdate}><CommentUpdate onClose={showUpdateCommentOption} update={props.update} commentId={commentId}/></div> }
        { (showOptions || showUpdateComment) && <Backdrop onClose={closeBackdrop} />  }
      </div>
    </div>
  );
};

export default Comment;
