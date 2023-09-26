import classes from "./FriendSection.module.css";
import Cart from "../cart/Cart";
import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import UserItemSkeleton from "../userItemSkeleton/UserItemSkeleton";

const FriendItem = lazy(() => import("../friendItem/FriendItem"))

const FriendSection = () => {
  const [friends, setFriends] = useState([]);
  const { _id : userId } = useSelector(state => state.user);
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: fetchFriendsError, sendRequest: fetchFriends} = useHttp();
  const reload = useSelector(state => state.rightbarUpdate.updateCounter);

  useEffect(() => {
    fetchFriends({
      url : `/api/user/friends/${userId}`,
      headers : {
        Authorization : token
      }
    }, (friendList) => setFriends(friendList));
  }, [token, fetchFriends, setFriends, userId, reload]);

  useEffect(() => {
    if (fetchFriendsError) {
      alert(fetchFriendsError.message);
      if (fetchFriendsError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [fetchFriendsError, setLogedOut]);

  return (
    <Cart title="User Friends">
      {
        <Suspense fallback={[...Array(5).keys()].map(key => <UserItemSkeleton key={key}/>)}>
          {
            friends.map((friend) =>
              <FriendItem key={friend._id} user={friend} />
            )
          }
        </Suspense>
      }
      {
        friends.length === 0 && <span className={classes.noFriend}>No friends!</span>
      }
    </Cart>
  );
};

export default FriendSection;
