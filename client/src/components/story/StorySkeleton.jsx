import classes from "./Story.module.css";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StorySkeleton = () => {
  const st = {
    display: "inline-block",
    width: "100%",
    height: "100%",
    borderRadius: "0.5erm",
    top: "0rem",
    left: "0rem",
  };

  return (
    <div className={classes.story}>
      <SkeletonTheme baseColor="var(--bg)" highlightColor="var(--bgSoft)">
        <div className={classes.skeletonContainer}>
          <Skeleton style={st} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default StorySkeleton;
