import { Close } from '@mui/icons-material';
import classes from './Options.module.css';

const PostOptions = (props) => {
  const updateAndClose = () => {
    props.onClose();
    props.update();
  }
  
  return (
    <div className={classes.postOptions}>
      <button onClick={props.onClose} className={classes.closeOptionButton}><Close className={classes.closeOption} /></button>
      <button onClick={updateAndClose} className={classes.optionButton}>Update</button>
      <button onClick={props.delete.bind(null, props.id)} className={classes.optionButton}>Delete</button>
    </div>
  );
}

export default PostOptions;