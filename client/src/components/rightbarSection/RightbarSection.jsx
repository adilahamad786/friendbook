import classes from "./RightbarSection.module.css";
import SuggestionSection from "../suggestionSection/SuggestionSection";
import FriendSection from "../friendSection/FriendSection";

const RightbarSection = () => {
  return (
    <section className={classes.rightbarSection}>
      <SuggestionSection />
      <FriendSection />
    </section>
  );
};

export default RightbarSection;
