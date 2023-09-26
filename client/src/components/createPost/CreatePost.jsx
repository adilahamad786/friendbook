import classes from "./CreatePost.module.css";
import ProfilePicture from "../profilePicture/ProfilePicture";
import { SendRounded } from "@mui/icons-material";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useRef, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";

const CreatePostSection = (props) => {
  const { username, profilePictureUrl } = useSelector(state => state.user);
  const { token, setLogedOut } = useContext(AuthContext);
  const [file, setFile] = useState();
  const messageRef = useRef();
  const { error: sendPostError, sendRequest: sendPost } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    const postData = new FormData();

    messageRef.current.value && postData.append("message", messageRef.current.value);
    file && postData.append("image", file);
    messageRef.current.value = '';
    setFile(null);

    sendPost({
      url : "/api/post/create",
      method : "POST",
      headers : {
        Authorization : token
      },
      body : postData
    }, (resPost) => {
      props.addPost(resPost);
    });
  }

  useEffect(() => {
    if (sendPostError) {
      alert(sendPostError.message);
      if (sendPostError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [sendPostError, setLogedOut]);

  return (
    <section className={classes.container}>
      <div className={classes.userInfo}>
        <ProfilePicture imageUrl={profilePictureUrl} />
        <span>{`What's on your mind ${username.toUpperCase()}?`}</span>
      </div>
      {
        file && (
            <div className={classes.preview}>
                <img src={URL.createObjectURL(file)} alt="Preview" />
            </div>
        )
      }
      <form onSubmit={submitHandler} className={classes.postForm}>
        <input type="text" ref={messageRef} placeholder="Write here..." name="postForm" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} name='image' id="image" />
        <button>
          <SendRounded />
        </button>
      </form>
      <div className={classes.options}>
        <label htmlFor="image" className={classes.option}>
          <div className={classes.icon}>
            <img src={Image} alt="AddImage" />
          </div>
          <span>Add Image</span>
        </label>
        <div className={classes.option}>
          <div className={classes.icon}>
            <img src={Map} alt="AddPlace" />
          </div>
          <span>Add Place</span>
        </div>
        <div className={classes.option}>
          <div className={classes.icon}>
            <img src={Friend} alt="AddFriend" />
          </div>
          <span>Tag Friends</span>
        </div>
      </div>
    </section>
  );
};

export default CreatePostSection;
