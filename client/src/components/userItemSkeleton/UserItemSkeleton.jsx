import classes from "./UserItemSkeleton.module.css";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserItemSkeleton = () => {
  return (
    <div className={classes.container}>
      <SkeletonTheme baseColor="var(--bgSoft)" highlightColor="var(--bg)">
        <div className={classes.userInfo}>
            <div className={classes.userIcon}>
                <Skeleton circle="true" width="100%" height="100%" />
            </div>
            <div className={classes.username}>
            <Skeleton />
            </div>
        </div>
        <div className={classes.button}>
            <Skeleton width="100%" borderRadius="1rem" />
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default UserItemSkeleton;