import classes from "./AccountVerification.module.css";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Form from "../../components/form/Form";

const AccountVerification = () => {
  const [otpBtnClicked, setOtpBtnClicked] = useState(false);
  const navigate = useNavigate();
  const { isLoading: otpIsSending, error: otpError, sendRequest: sendOtp } = useHttp();
  const { isLoading: sendingRegisterForm, error: registerationError, sendRequest: sendRegisterRequest } = useHttp();

  // Getting user from cookies
  const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const otpSendHandler = (inputValue, event) => {
    event.preventDefault();

    // Sending Otp on user email
    sendOtp({
      url: "/api/user/send-otp",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    }, (res) => {
      alert(res.message);
      setOtpBtnClicked(true);
    });
  };

  const sendRegisterForm = (inputValue, event) => {
    event.preventDefault();

    const registerationForm = {
      username: user?.username,
      email: user?.email,
      password: user?.password,
      otp: inputValue,
    };

    // submit registeration form
    sendRegisterRequest(
      {
        url: "/api/user/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerationForm),
      },
      (res) => {
        Cookies.remove("user");
        alert(res.message);
        navigate("/");
      }
    );
  };

  useEffect(() => {
    if (otpError || registerationError) {
      alert(otpError.message || registerationError.message);
      if (otpError.errorType === "bad_request" || registerationError.errorType === "bad_request") {
        Cookies.remove("user");
        navigate("/login");
      }
    }
  }, [otpError, registerationError, navigate]);

  return (
    <section className={classes.container}>
      <div className={classes.formBox}>
        <h3>Account Verification</h3>
        <Form
          handler={otpSendHandler}
          inputDisable={true}
          placeholder={user?.email}
          type="email"
          validate={(value) => value}
          btnClicked={false}
          btnDisabled={false}
          btnTextOne="Resend OTP"
          btnTextTwo="Send OTP"
          isFetching={otpIsSending}
          />
        {
          otpBtnClicked &&
          <Form
            handler={sendRegisterForm}
            inputDisabled={false}
            placeholder="Enter your OTP"
            type="number"
            validate={(value) => value.length === 6}
            btnDisabled={true}
            btnTextTwo="Submit"
            inputErrorMessage="Invalid OTP!"
            isFetching={sendingRegisterForm}
          />
        }
      </div>
    </section>
  );
};

export default AccountVerification;
