import classes from "./Story.module.css";

const Story = (props) => {
  const {username, storyUrl} = props.story;
  
  return (
    <div className={classes.story}>
      <img className={classes.image} src={storyUrl} alt="Story" />
      <span className={classes.name}>{username.toUpperCase()}</span>
    </div>
  );
};

export default Story;
