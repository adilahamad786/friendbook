import classes from "./StorySection.module.css";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect, useContext, lazy, Suspense } from "react";
import AuthContext from "../../context/AuthContext";
import StorySkeleton from "../story/StorySkeleton";
const CreateStory = lazy(() => import("../createStory/CreateStory"));
const Story = lazy(() => import("../story/Story"));

const StorySection = () => {
  const [stories, setStories] = useState([]);
  const { token, setLogedOut } = useContext(AuthContext);
  const { error: fetchStoriesError, sendRequest: fetchStories } = useHttp();

  useEffect(() => {
    fetchStories({
      url : "/api/user/story/timeline",
      headers : {
        Authorization : token
      }
    }, (stories) => {
      setStories(stories);
    })
  }, [fetchStories, token]);

  useEffect(() => {
    if (fetchStoriesError) {
      alert(fetchStoriesError.message);
      if (fetchStoriesError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [fetchStoriesError, setLogedOut]);

  return (
    <section className={classes.container}>
      <Suspense fallback={<StorySkeleton />}>
        <CreateStory />
      </Suspense>
      <Suspense fallback={[...Array(5).keys()].map(key => <StorySkeleton key={key}/>)}>
        {
          stories.map((story) =>
          <Story key={story._id} story={story} />
          )
        }
      </Suspense>
    </section>
  );
};

export default StorySection;