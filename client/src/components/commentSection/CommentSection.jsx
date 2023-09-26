import classes from "./CommentSection.module.css";
import AddComment from "../addComment/AddComment";
import Comment from "../comment/Comment";
import { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { deleteElement } from "../../helpers/deleteElement";
import { replaceElement } from "../../helpers/replaceElement";

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: commentsError, sendRequest: fetchComments } = useHttp();
  const { error: deleteCommentError, sendRequest: deleteCommentRequest } = useHttp();
  const { error: updateCommentError, sendRequest: updateCommentRequest } = useHttp();

  useEffect(() => {
    fetchComments({
      url: `/api/comment/post/${props.postId.toString()}`,
      headers: {
        Authorization: token
      }
    }, (comments) => {
      setComments(comments.reverse());
    });
  }, [fetchComments, props.postId, setComments, token]);

  const deleteComment = (commentId) => {
    deleteCommentRequest({
      url: `/api/comment/remove/${commentId}`,
      method: "DELETE",
      headers: {
        Authorization: token
      }
    }, (res) => {
      const newComments = deleteElement(comments, res.commentId); 
      setComments(newComments);
      props.updateCommentCounter(-1);
    });
  };

  const updateComment = ({ commentId, message}) => {
    updateCommentRequest({
      url : `/api/comment/update/${commentId}`,
      method : "PATCH",
      headers : {
        Authorization : token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({ message })
    }, (updatedComment) => {
      const newComments = replaceElement(comments, updatedComment);
      setComments(newComments);
    });
  }
  
  useEffect(() => {
    if (commentsError || deleteCommentError || updateCommentError) {
      alert(commentsError.message || deleteCommentError.message || updateCommentError.message);
      if (commentsError.errorType === "unauthorized" || deleteCommentError.errorType === "unauthorized" || updateCommentError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [commentsError, deleteCommentError, updateCommentError, setLogedOut]);

  const updateComments = (newComment) => {
    setComments(state => [newComment, ...state]);
    props.updateCommentCounter(1);
  };

  return (
    <section className={classes.container}>
      <AddComment updateComments={updateComments} postId={props.postId} />
      <div className={classes.commentsContainer}>
        {comments.map((comment) => {
          return <Comment update={updateComment} delete={deleteComment} key={comment._id} data={comment} />;
        })}
      </div>
    </section>
  );
}

export default CommentSection;
