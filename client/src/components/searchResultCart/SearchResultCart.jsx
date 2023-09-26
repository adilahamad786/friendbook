import classes from "./SearchResultCart.module.css";
import Cart from "../cart/Cart";
import { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/useHttp";
import UserItemSkeleton from "../userItemSkeleton/UserItemSkeleton";
import SuggestionItem from "../suggestionItem/SuggestionItem";

const SearchResultCart = (props) => {
  const [users, setUsers] = useState([]);
  const { token, setLogedOut } = useContext(AuthContext);
  const { isLoading, error: fetchUsersError, sendRequest: fetchUsers } = useHttp();

  useEffect(() => {
    fetchUsers({
      url : "/api/user/all-users",
      headers : {
        Authorization : token
      }
    }, (resData) => setUsers(resData));
  }, [fetchUsers, token, setUsers]);

  useEffect(() => {
    if (fetchUsersError) {
      alert(fetchUsersError.message);
      if (fetchUsersError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [fetchUsersError, setLogedOut]);

  const searchResult = users.filter(user => {
    return user.username.toLocaleLowerCase().includes(props.searchText.toLowerCase())
  });

  return (
      <Cart className={classes.searchResultCart} title="Searching result...">
        {
          isLoading && <>{[...Array(5).keys()].map(key => <UserItemSkeleton key={key}/>)}</>
        }
        {
          !isLoading && searchResult.map((user) =>
            <SuggestionItem onClose={props.onClose} key={user._id} user={user} />
          )
        }
        {
          searchResult.length === 0 && <span className={classes.notFound}>Not found!</span>
        }
      </Cart>
  );
};

export default SearchResultCart;
