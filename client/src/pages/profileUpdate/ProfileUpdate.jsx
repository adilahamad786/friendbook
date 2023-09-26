import classes from "./ProfileUpdate.module.css";
import { useEffect, useRef, useState } from "react";
import { FlipCameraIos, SystemUpdateAlt } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import noProfilePicture from "../../assets/noProfilePicture.png";
import noCoverPicture from "../../assets/noCoverPicture.png";
import { useContext } from "react";
import ShowContext from "../../context/ShowContext";
import AuthContext from "../../context/AuthContext";
import moveOnTop from "../../utils/moveOnTop";
import CircularProgress from '@mui/material/CircularProgress';

function ProfileUpdate() {
  // Move top of the page
  moveOnTop();

  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { show: hideSection } = useContext(ShowContext);
  const { setLogedOut } = useContext(AuthContext);

  const username = useRef();
  const age = useRef();
  const description = useRef();
  const location = useRef();
  const facebook = useRef();
  const instagram = useRef();
  const twitter = useRef();
  const linkedIn = useRef();
  const pinterest = useRef();
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const { isLoading, error: sendUpdateRequestError, sendRequest: sendUpdateRequest } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (username.current.value)
      formData.append("username", username.current.value);
    if (age.current.value)
      formData.append("age", age.current.value);
    if (description.current.value)
      formData.append("description", description.current.value);
    if (location.current.value)
      formData.append("location", location.current.value);  
    if (facebook.current.value)
      formData.append("facebook", facebook.current.value);  
    if (instagram.current.value)
      formData.append("instagram", instagram.current.value);  
    if (twitter.current.value)
      formData.append("twitter", twitter.current.value);  
    if (linkedIn.current.value)
      formData.append("linkedIn", linkedIn.current.value);  
    if (pinterest.current.value)
      formData.append("pinterest", pinterest.current.value);  
    if (gender)
      formData.append("gender", gender);  
    if (relationship)
      formData.append("relationship", relationship);  
    if (profilePicture)
      formData.append("profilePicture", profilePicture);  
    if (coverPicture)
      formData.append("coverPicture", coverPicture);  

    sendUpdateRequest({
      url : "/api/user/update",
      method : "PATCH",
      headers : {
        Authorization : Cookies.get("token"),
      },
      body : formData
    }, (updatedUser) => {
      dispatch(userActions.replace(updatedUser));
    })
  };

  useEffect(() => {
    if (sendUpdateRequestError) {
      alert(sendUpdateRequestError.message);
      if (sendUpdateRequestError.errorType === "unauthorized") {
        setLogedOut();
      }
    }
  }, [sendUpdateRequestError, setLogedOut]);
  
  return (
    <section className={`${classes.container} ${hideSection ? classes.hide : ''}`}>
      <section className={classes.topSection}>
        <div className={classes.coverPictureChange}>
          <label
            htmlFor="coverPicture"
            className={classes.coverPictureChangeLabel}
          >
            <SystemUpdateAlt className={classes.coverPictureChangeIcon} />
            <span className={classes.coverPictureChangeText}>Change</span>
          </label>
          <img
            src={
              coverPicture
                ? URL.createObjectURL(coverPicture)
                : currentUser.coverPictureUrl ? currentUser.coverPictureUrl : noCoverPicture
            }
            className={classes.profileCoverImg}
            alt="CoverPicture"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="coverPicture"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </div>
        <div className={classes.profilePictureChange}>
          <label
            htmlFor="profilePicture"
            className={classes.profilePictureUpdateLabel}
          >
            <FlipCameraIos style={{ fontSize: "35px", border: "none" }} />
          </label>
          <img
            src={
              profilePicture
                ? URL.createObjectURL(profilePicture)
                : currentUser.profilePictureUrl ? currentUser.profilePictureUrl : noProfilePicture
            }
            className={classes.profileUserImg}
            alt="ProfilePicture"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="profilePicture"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <span className={classes.userProfileName}>{currentUser.username.toUpperCase()}</span>
        <span className={classes.userProfileDescription}>{currentUser?.description}</span>
      </section>
      <section className={classes.formSection}>
        <form className={classes.form} onSubmit={submitHandler}>
          <h3 className={classes.formTitle}>User information</h3>
          <div className={classes.fieldInputBox}>
            <label htmlFor="username" className={classes.inputLabel}>
              Userame :
            </label>
            <input
              placeholder="Enter your full name"
              id="username"
              ref={username}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="description" className={classes.inputLabel}>
              Description :
            </label>
            <input
              placeholder="Enter your description"
              id="description"
              ref={description}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="age" className={classes.inputLabel}>
              Age :
            </label>
            <input
              placeholder="Enter your age"
              id="age"
              type="number"
              ref={age}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="gender" className={classes.inputLabel}>
              Gender :
            </label>
            <div className={classes.radioContainer}>
              <div className={classes.item}>
                <label htmlFor="gender">Male :</label>
                <input value={1} type="radio" name="gender" onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className={classes.item}>
                <label htmlFor="gender" >Female :</label>
                <input value={2} type="radio" name="gender" onChange={(e) => setGender(e.target.value)} />
              </div>
            </div>
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="relationship" className={classes.inputLabel}>
              Relationship :
            </label>
            <div className={classes.radioContainer}>
              <div className={classes.item}>
                <label htmlFor="relationship">Single :</label>
                <input value={1} type="radio" name="relationship" onChange={(e) => setRelationship(e.target.value)} />
              </div>
              <div className={classes.item}>
                <label htmlFor="relationship" >Married :</label>
                <input value={2} type="radio" name="relationship" onChange={(e) => setRelationship(e.target.value)} />
              </div>
            </div>
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="location" className={classes.inputLabel}>
              Location :
            </label>
            <input
              placeholder="Enter your location"
              id="location"
              type="text"
              ref={location}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="linkedin" className={classes.inputLabel}>
              LinkedIn :
            </label>
            <input
              placeholder="Enter your LinkedIn link"
              id="linkedin"
              type="url"
              ref={linkedIn}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="twitter" className={classes.inputLabel}>
              Twitter :
            </label>
            <input
              placeholder="Enter your Twitter link"
              id="twitter"
              type="url"
              ref={twitter}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="facebook" className={classes.inputLabel}>
              Facebook :
            </label>
            <input
              placeholder="Enter your Facebook link"
              id="facebook"
              type="url"
              ref={facebook}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="instagram" className={classes.inputLabel}>
              Instagram :
            </label>
            <input
              placeholder="Enter your Instagram link"
              id="instagram"
              type="url"
              ref={instagram}
              className={classes.formInput}
            />
          </div>
          <div className={classes.fieldInputBox}>
            <label htmlFor="pinterest" className={classes.inputLabel}>
              Pinterest :
            </label>
            <input
              placeholder="Enter your Pinterest link"
              id="pinterest"
              type="url"
              ref={pinterest}
              className={classes.formInput}
            />
          </div>
          <button className={classes.formUpdateButton} type="submit">
            {isLoading ? <CircularProgress color="inherit" size="1.2rem"/> : "Update Profile"}
          </button>
        </form>
        <Link to='/' className={classes.discartButtonLink}><button className={classes.discartButton} type="submit">
          Discart Changes
        </button></Link>
      </section>
    </section>
  );
}

export default ProfileUpdate;
