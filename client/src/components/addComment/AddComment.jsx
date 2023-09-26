import classes from "./AddComment.module.css";
import ProfilePicture from "../profilePicture/ProfilePicture";
import { SendOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useRef, useContext, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";

const AddComment = (props) => {
  const { profilePictureUrl } = useSelector(state => state.user);
  const messageRef = useRef();
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: sendCommentError, sendRequest: sendComment } = useHttp();

  const addComment = (e) => {
    e.preventDefault();
    const data = { message : messageRef.current.value };

    sendComment({
      url : `/api/comment/add/${props.postId}`,
      method : "POST",
      headers : {
        Authorization : token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }, (newComment) => {
      props.updateComments(newComment);
    });
    messageRef.current.value = "";
  }

  useEffect(() => {
    if (sendCommentError) {
      alert(sendCommentError.message);
      if (sendCommentError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [sendCommentError, setLogedOut]);

  return (
    <div className={classes.addComment}>
      <ProfilePicture className={classes.profilePicture} imageUrl={profilePictureUrl} />
      <form onSubmit={addComment} className={classes.commentForm}>
        <input type="text" ref={messageRef}/>
        <button>
          <SendOutlined />
        </button>
      </form>
    </div>
  );
};

export default AddComment;
