import classes from './CommentUpdate.module.css';
import { useState, useEffect } from "react";

const CommentUpdate = (props) => {
  const [inputText, setInputText] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (inputText) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false);
    }
  }, [inputText, setIsFormValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.update({ commentId : props.commentId, message : inputText});
    props.onClose();
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.updateForm}>
        <input className={classes.textInput} onChange={(e) => {setInputText(e.target.value)}} value={inputText} type="text" placeholder='Write your message...' />
        <button disabled={!isFormValid}>Update</button>
      </form>
      <button onClick={props.onClose}>Close</button>
    </div>
  )
}

export default CommentUpdate;