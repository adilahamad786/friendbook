import classes from "./Navbar.module.css";
import {
  HomeOutlined,
  DarkModeOutlined,
  WbSunnyOutlined,
  NotificationsOutlined,
  EmailOutlined,
  GridViewOutlined,
  PersonOutlined,
  SearchOutlined,
  Close,
} from "@mui/icons-material";
import ProfileOptions from "../profileOptions/ProfileOptions";
import Backdrop from "../backdrop/Backdrop";
import ShowContext from "../../context/ShowContext";
import SearchResultCart from "../searchResultCart/SearchResultCart";
import useInput from "../../hooks/useInput";
import noProfilePicture from "../../assets/noProfilePicture.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = (props) => {
  const { profilePictureUrl, username } = props.user;
  const { theme, changeTheme } = useContext(ThemeContext);
  const { show: showMenu, setShow: setShowMenu } = useContext(ShowContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const {
    value: searchText,
    isValid: searchTextIsValid,
    setValue: setSearchText,
    setFocus: setSearchTextFieldFocus,
    reset
  } = useInput((value) => value.length > 0);

  useEffect(() => {
    if (searchTextIsValid) {
      setShowSearch(true);
    }
    else {
      setShowSearch(false);
    }
  }, [searchTextIsValid, setShowSearch]);

  const showSearchHandler = () => {
    setShowSearch(state => !state);
    reset();
  };

  const showOptionsHandler = () => {
    setShowOptions(state => !state);
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.left}>
        <Link to="/" className={classes.logo}>
          <span>Friendbook</span>
        </Link>
        <Link to="/" className={classes.homeIconLink}>
          <HomeOutlined />
        </Link>
        <div className={classes.themeIcon} onClick={changeTheme}>
          {theme ? <DarkModeOutlined /> : <WbSunnyOutlined />}
        </div>
        <form className={classes.search}>
          <SearchOutlined onClick={showSearchHandler} />
          <input
            onChange={setSearchText}
            onFocus={setSearchTextFieldFocus}
            value={searchText}
            className={`${showSearch ? classes.searchField : classes.hide}`}
            type="search"
            placeholder="Search..."
          />
        </form>
        { searchTextIsValid && <div className={classes.searchResult}>
          <SearchResultCart onClose={showSearchHandler} searchText={searchText}/>
        </div> }
        { (showSearch || searchTextIsValid) && <Backdrop onClose={showSearchHandler} />}
        <div className={classes.menuIcon} onClick={setShowMenu}>
          {showMenu ? <Close /> : <GridViewOutlined />}
        </div>
      </div>
      <div className={classes.right}>
        <PersonOutlined />
        <EmailOutlined />
        <NotificationsOutlined />
        <div onClick={showOptionsHandler} className={classes.profile}>
          <img
            src={profilePictureUrl ? profilePictureUrl : noProfilePicture}
            alt="Profile"
          />
          <span>{username.toUpperCase()}</span>
        </div>
        {showOptions && (
          <div className={classes.profileOptionsMenu} >
            <ProfileOptions onClose={showOptionsHandler} />
          </div>
        )}
        {showOptions && <Backdrop onClose={showOptionsHandler} />}
      </div>
    </div>
  );
};

export default Navbar;
