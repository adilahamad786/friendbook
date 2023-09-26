import classes from "./Home.module.css";
import StorySection from "../../components/storySection/StorySection";
import PostSection from "../../components/postSection/PostSection";
import { useContext } from "react";
import ShowContext from "../../context/ShowContext";
import moveOnTop from "../../utils/moveOnTop";

const Home = () => {
  // Move top of the page
  moveOnTop();

  const { show } = useContext(ShowContext);

  return (
    <section className={`${classes.container} ${ show ? classes.hide : ''}`}>
      <StorySection />
      <PostSection />
    </section>
  );
};

export default Home;
