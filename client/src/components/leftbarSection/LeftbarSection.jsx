import classes from './LeftbarSection.module.css'
import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import noProfilePicture from '../../assets/noProfilePicture.png';
import ProfileOptions from '../profileOptions/ProfileOptions';
import Backdrop from '../backdrop/Backdrop';

import { useState, useContext } from 'react';
import ShowContext from '../../context/ShowContext';
import FriendSection from '../friendSection/FriendSection';

const LeftbarSection = (props) => {
  const { profilePictureUrl, username } = props.user;
  const [showOptions, setShowOptions] = useState(false);
  const { show: showMenu, setShow: setShowMenu } = useContext(ShowContext);
  const [showFriendList, setShowFriendList] = useState(false);

  const showFriendListHandler = () => {
    setShowFriendList(state => !state);
  }

  const showOptionsHandler = () => {
    setShowOptions(showOptions => !showOptions);
  }

  const showOptionsAndMenuHandler = () => {
    setShowOptions(showOptions => !showOptions);
    setShowMenu();
  }

  return (
    <section className={`${classes.leftbarSection} ${showMenu ? classes.show : ''}`} >
      <div className={classes.container}>
        <div className={classes.menu}>
          <div onClick={showOptionsHandler} className={classes.item}>
            <div className={classes.profilePicture}>
              <img src={profilePictureUrl ? profilePictureUrl : noProfilePicture} alt="ProfilePicture"/>
            </div>
            <span className={classes.username}>{username?.toUpperCase()}</span>
          </div>
          <div className={classes.showProfileOptions}>
            { showOptions && <ProfileOptions onClose={showOptionsAndMenuHandler} /> }
          </div>
          { showOptions && <Backdrop onClose={showOptionsHandler} /> }
          <div onClick={showFriendListHandler} className={classes.item}>
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          { showFriendList && <div className={classes.friends}>
            <FriendSection />
          </div> }
          { showFriendList && <Backdrop onClose={showFriendListHandler} /> }
          <div className={classes.item}>
            <img src={Groups} alt="Groups" />
            <span>Groups</span>
          </div>
          <div className={classes.item}>
            <img src={Market} alt="Marketplace" />
            <span>Marketplace</span>
          </div>
          <div className={classes.item}>
            <img src={Watch} alt="Watch" />
            <span>Watch</span>
          </div>
          <div className={classes.item}>
            <img src={Memories} alt="Memories" />
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <span className={classes.title}>Your shortcuts</span>
        <div className={classes.menu}>
          <div className={classes.item}>
            <img src={Events} alt="Events" />
            <span>Events</span>
          </div>
          <div className={classes.item}>
            <img src={Gaming} alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className={classes.item}>
            <img src={Gallery} alt="Gallery" />
            <span>Gallery</span>
          </div>
          <div className={classes.item}>
            <img src={Videos} alt="Videos" />
            <span>Videos</span>
          </div>
          <div className={classes.item}>
            <img src={Messages} alt="Messages" />
            <span>Messages</span>
          </div>
        </div>
        <hr/>
        <span className={classes.title}>Others</span>
        <div className={classes.menu}>
          <div className={classes.item}>
            <img src={Fund} alt="Fundraser" />
            <span>Fundraser</span>
          </div>
          <div className={classes.item}>
            <img src={Tutorials} alt="Tutorials" />
            <span>Tutorials</span>
          </div>
          <div className={classes.item}>
            <img src={Courses} alt="Courses" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeftbarSection;
