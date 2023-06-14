import { useDispatch, useSelector } from "react-redux";
import Background from "../Background/Background";
import { useFormik } from "formik";
import { userLogin } from "../../store/slice/signupSlice";
import SuccessfulPopup from "../Popups/SuccessfulPopup";
import { useState } from "react";

const initialValues = {
  email: "",
  password: ""
}

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);
  const isAdmin = useSelector(state => state.role.isAdmin);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, {props, setSubmitting}) => {
      dispatch(userLogin(values)).then(response => {
        localStorage.setItem("accesstoken", response.payload.data.accessToken)
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false)
        }, 1000);
        setSubmitting(false);
      })
    }
  })

  const handleClose = () => {
    setShowPopup(false);
  }
  return (
    <>
    <Background>
      <div className="form">
        <h2>Log In</h2>
        <form onSubmit={formik.handleSubmit}>
          {isAdmin && <>
            <div className="inputBox">
            <input type="email" placeholder="User Email" value="email" {...formik.getFieldProps("email")}/>
          </div>
          <div className="inputBox">
            <input type="password" placeholder="Password" value="password" {...formik.getFieldProps("password")} />
          </div>
          </>}
          {!isAdmin && <div className="inputBox">
            <input type="text" placeholder="Employee Code" />
          </div>}
          
          <div className="inputBox">
            <input type="submit" value="Login" />
          </div>
        </form>
        <p className="forget">
            Forgot Account?<a href="#"> Click Here</a>
          </p>
          <p>
            Don't have an Account?<a href="/signup"> Click Here</a>
          </p>
      </div>
    </Background>
    <SuccessfulPopup showPopup={showPopup} closePopup={handleClose} message="Logged In"/>
    </>
  );
};

export default Login;
