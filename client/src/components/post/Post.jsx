import classes from "./Post.module.css";
import {
  MoreHoriz,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  TextsmsOutlined,
  ShareOutlined
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";
import CommentSection from "../commentSection/CommentSection";
import { useState, useContext, useEffect } from "react";
import Options from "../options/Options";
import Backdrop from "../backdrop/Backdrop";
import moment from "moment"
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { useSelector } from "react-redux";
import PostUpdate from "../postUpdate/PostUpdate";

const Post = (props) => {
  const { _id: postId, createdAt, owner, imageUrl, message } = props.post;
  const [liked, setLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(props.post.likeCounter);
  const [showComments, setShowComments] = useState(false);
  const [commentCounter, setCommentCounter] = useState(props.post.commentCounter);
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdatePost, setShowUpdatePost] = useState(false);
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: likeError, sendRequest: sendLikeRequest } = useHttp();
  const { error: likeStatusError, sendRequest: getLikeStatus } = useHttp();
  const currentUeserId = useSelector(state => state.user._id);

  const timeago = moment(new Date(createdAt)).fromNow();
  const hasOwnPost = owner._id === currentUeserId;

  useEffect(() => {
    getLikeStatus({
      url : `/api/like/status/${postId}`,
      headers : {
        Authorization : token
      }
    }, (res) => {
      setLiked(res.liked);
    });
  }, [getLikeStatus, postId, token, setLiked]);

  const likeHandler = () => {
    sendLikeRequest({
      url : `/api/like/${postId}`,
      method : "PUT",
      headers : {
        Authorization : token
      }
    }, (res) => {
      setLiked(res.liked);
      setLikeCounter(state => state + (res.liked ? 1 : -1));
    });
  }

  useEffect(() => {
    if (likeError || likeStatusError) {
      alert(likeError.message || likeStatusError.message);
      if (likeError.errorType === "unauthorized" || likeStatusError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [likeError, likeStatusError, setLogedOut]);

  const showCommentHandler = () => {
    setShowComments(showComments => !showComments);
  }
  
  const updateCommentCounter = (add) => {
    setCommentCounter(state => state + add);
  }

  const showMenuHandler = () => {
    setShowOptions(showOptions => !showOptions && hasOwnPost);
  }

  const showUpdatePostOption = () => {
    setShowUpdatePost(state => !state);
  }

  const closeBackdrop = () => {
    setShowOptions(false);
    setShowUpdatePost(false);
    setShowComments(false);
  }

  return (
    <div className={classes.post}>
      <div className={classes.user}>
        <Link to={`/profile/${owner._id}`} className={classes.userInfo}>
          <ProfilePicture imageUrl={owner.profilePictureUrl} />
          <div className={classes.details}>
            <span className={classes.username}>{owner.username.toUpperCase()}</span>
            <span className={classes.time}>{timeago}</span>
          </div>
        </Link>
        <div className={classes.menu}>
          { !showOptions && <MoreHoriz onClick={showMenuHandler} /> }
          { showOptions && <Options update={showUpdatePostOption} delete={props.deletePost.bind(null, postId)} onClose={showMenuHandler} /> }
          { showUpdatePost && <div className={classes.postUpdate}><PostUpdate onClose={showUpdatePostOption} update={props.updatePost} postId={postId.toString()} imageUrl={imageUrl}/></div> }
          { (showOptions || showUpdatePost || showComments) && <Backdrop onClose={closeBackdrop} /> }
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.message}>
          <p>{message}</p>
        </div>
        <div className={classes.image}>
          { 
            imageUrl && <img className={classes.postImage} src={imageUrl} alt="PostImage" /> }
        </div>
      </div>
      <div className={classes.options}>
        <div onClick={likeHandler} className={classes.option}>
          {liked ? <FavoriteOutlined className={classes.optionIcon} /> : <FavoriteBorderOutlined className={classes.optionIcon} />}
          <span>{`${likeCounter} Likes`}</span>
        </div>
        <div onClick={showCommentHandler} className={classes.option}>
          <TextsmsOutlined className={classes.optionIcon} />
          <span>{`${commentCounter} Comments`}</span>
        </div>
        <div className={classes.option}>
          <ShareOutlined className={classes.optionIcon} />
          <span>Share</span>
        </div>
      </div>
      {showComments && <CommentSection updateCommentCounter={updateCommentCounter} postId={postId}/>}
    </div>
  );
};

export default Post;
