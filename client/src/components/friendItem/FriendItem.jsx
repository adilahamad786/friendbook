import classes from './FriendItem.module.css';
import UserItem from "../userItem/UserItem";
import RemoveButton from "../removeButton/RemoveButton";

const FriendItem = (props) => {
  return (
    <div className={classes.container}>
      <UserItem user={props.user}/>
      <RemoveButton userId={props.user._id} />
    </div>
  );
};

export default FriendItem;