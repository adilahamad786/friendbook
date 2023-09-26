import classes from "./SuggestionSection.module.css";
import Cart from "../cart/Cart";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect, useContext, lazy, Suspense } from "react";
import AuthContext from "../../context/AuthContext";
import { useSelector } from "react-redux";
import UserItemSkeleton from "../userItemSkeleton/UserItemSkeleton";

const SuggestionItem = lazy(() => import("../suggestionItem/SuggestionItem"));

const SuggestionSection = () => {
  const { token, setLogedOut} = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState([]);
  const { error: fetchSuggestionError, sendRequest: fetchSuggestion } = useHttp();
  const reload = useSelector(state => state.rightbarUpdate.updateCounter);

  useEffect(() => {
    fetchSuggestion({
      url : '/api/user/suggestion',
      headers : {
        Authorization : token
      }
    }, (resData) => {
      setSuggestion(resData);
    });
  }, [fetchSuggestion, setSuggestion, token, reload]);

  useEffect(() => {
    if (fetchSuggestionError) {
      alert(fetchSuggestionError.message);
      if (fetchSuggestionError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [fetchSuggestionError, setLogedOut]);

  return (
    <Cart title="Suggestion For You">
      {
        <Suspense fallback={[...Array(5).keys()].map(key => <UserItemSkeleton key={key}/>)}>
          {
            suggestion.map((user) =>
              <SuggestionItem key={user._id} user={user} />
            )
          }
        </Suspense>
      }
      {
        suggestion.length === 0 && <span className={classes.noSuggestion}>No suggestions!</span>
      }
    </Cart>
  );
}

export default SuggestionSection;