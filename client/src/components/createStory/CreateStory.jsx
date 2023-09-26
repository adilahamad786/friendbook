import classes from "./CreateStory.module.css";
import { useState, useEffect, useContext } from 'react';
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { useSelector } from "react-redux";
import noStory from "../../assets/noStory.jpg";

const CreateStory = () => {
  const [story, setStory] = useState(undefined);
  const { token, setLogedOut } = useContext(AuthContext);
  const { storyUrl, username } = useSelector(state => state.user);
  const { error: updateStoryError, sendRequest: updateStory } = useHttp();

  const changeHandler = (e) => {
    setStory(e.target.files[0]);

    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("story", e.target.files[0]);

      updateStory({
        url : "/api/user/create-story",
        method : "PUT",
        headers : {
          Authorization : token
        },
        body : formData
      }, (res) => {});
    }
  }

  useEffect(() => {
    if (updateStoryError) {
      alert(updateStoryError.message);
      if (updateStoryError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [updateStoryError, setLogedOut]);

  return (
    <div className={classes.createStory}>
      <img
        src={ story ? URL.createObjectURL(story) : storyUrl ? storyUrl : noStory }
        alt="CreateStory"
      />
      <input type="file" onChange={changeHandler} name="story" id="story" />
      <span>{username.toUpperCase()}</span>
      <label htmlFor="story" className={classes.add}>+</label>
    </div>
  );
};

export default CreateStory;
