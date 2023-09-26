import classes from './Cart.module.css';

const RightbarCart = (props) => {
  return (
    <div className={classes.cart}>
      <span className={classes.cartTitle}>{props.title}</span>
      <div className={classes.itemsContainer}>
        { props.children }
      </div>
    </div>
  );
}

export default RightbarCart;
