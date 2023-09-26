import classes from "./Post.module.css";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
  return (
    <div className={classes.post}>
      <SkeletonTheme baseColor="var(--bgSoft)" highlightColor="var(--bg)">
        <div className={classes.user}>
          <div className={classes.userInfo}>
            <div><Skeleton circle="true" width="2.5rem" height="2.5rem" /></div>
            <div className={classes.details}>
              <span className={classes.username}><Skeleton width="7rem"/></span>
              <span className={classes.time}><Skeleton width="5rem"/></span>
            </div>
          </div>
          <div className={classes.menu}>
            <Skeleton width="2.5rem" height="0.6rem"/>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.message}>
            <p><Skeleton /></p>
            <p><Skeleton width="70%" /></p>
          </div>
          <div className={classes.postImage}>
            <div className={classes.skeletonImage} >
              <Skeleton height="100%" width="100%" />
            </div>
          </div>
        </div>
        <div className={classes.options}>
          <div className={classes.skeletonOption}>
            <div className={classes.skeletonContainer}>
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
          <div className={classes.skeletonOption}>
            <div className={classes.skeletonContainer}>
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
          <div className={classes.skeletonOption}>
            <div className={classes.skeletonContainer}>
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default PostSkeleton;