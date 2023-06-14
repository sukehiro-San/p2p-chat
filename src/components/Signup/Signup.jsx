import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userRegistration } from "../../store/slice/signupSlice";
import SuccessfulPopup from "../Popups/SuccessfulPopup";
import { useState } from "react";

const initialValues = {
  userName: "",
  role: "",
  companyName: "",
  companyWebsite: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validate = (values) => {
  let error = {};
  if (!values.companyName) {
    error.companyName = " ";
  } else if (!/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.companyName)) {
    error.companyName = "Invalid Text Format";
  }
  if (!values.companyWebsite) {
    error.companyWebsite = " ";
  } else if (
    !/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i.test(
      values.companyWebsite
    )
  ) {
    error.companyWebsite = "Invalid Text Format";
  }
  if (!values.userName) {
    error.userName = " ";
  } else if (!/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.userName)) {
    error.userName = "Invalid Text Format";
  }
  if (!values.role) {
    error.role = " ";
  }
  if (!values.email) {
    error.email = " ";
  } else if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+$/i.test(values.email)) {
    error.email = "Incorrect email address";
  }
  if (!values.password) {
    error.password = " ";
  } else if (
    !/^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.password
    )
  ) {
    error.password =
      "Between 8 to 16 with 1 capital, 1 numeric and 1 character (!@#$%^&*)";
  } else if (values.password.length <= 7 || values.password.length > 16) {
    error.password = "Password should between 8 to 16 character";
  }
  if (!values.confirmPassword) {
    error.confirmPassword = " ";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "Passwords does not match";
  }
  return error;
};

const Signup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      dispatch(userRegistration(values)).then(res => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false)
          window.location.pathname = "/"
        }, 1000);
        setSubmitting(false);
      });
    },
    validate,
  });
  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div>
        <section>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="box">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="container">
              <div className="form">
                <h2>Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.userName && formik.errors.userName ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.userName}
                      </div>
                    ) : null}
                    <input
                      type="text"
                      placeholder="User Name"
                      value="userName"
                      style={{
                        border: `${
                          formik.touched.userName && formik.errors.userName
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("userName")}
                    />
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.role && formik.errors.role ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.role}
                      </div>
                    ) : null}
                    <select
                      className="selectBox"
                      name="role"
                      style={{
                        border: `${
                          formik.touched.role && formik.errors.role
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("role")}
                    >
                      <option value="" disabled selected>
                        Choose role
                      </option>
                      {["Founder", "Co-founder", "HR"].map((data) => {
                        return (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.companyName}
                      </div>
                    ) : null}
                    <input
                      type="text"
                      placeholder="Company Name"
                      value="companyName"
                      style={{
                        border: `${
                          formik.touched.companyName &&
                          formik.errors.companyName
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("companyName")}
                    />
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.companyWebsite &&
                    formik.errors.companyWebsite ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.companyWebsite}
                      </div>
                    ) : null}
                    <input
                      type="text"
                      placeholder="Enter Company Website"
                      name="companyWebsite"
                      style={{
                        border: `${
                          formik.touched.companyWebsite &&
                          formik.errors.companyWebsite
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("companyWebsite")}
                    />
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.email && formik.errors.email ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.email}
                      </div>
                    ) : null}
                    <input
                      type="email"
                      placeholder="Email"
                      value="email"
                      style={{
                        border: `${
                          formik.touched.email && formik.errors.email
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.password && formik.errors.password ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                          fontSize: "11px",
                        }}
                      >
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <input
                      type="password"
                      placeholder="Password"
                      value="password"
                      style={{
                        border: `${
                          formik.touched.password && formik.errors.password
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  <div className="inputBox" style={{ position: "relative" }}>
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div
                        style={{
                          position: "absolute",
                          color: "red",
                          marginBottom: "25px",
                        }}
                      >
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value="confirmPassword"
                      style={{
                        border: `${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "1px solid red"
                            : ""
                        }`,
                      }}
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </div>
                  <div className="inputBox">
                    <input type="submit" value=" Sign Up " />

                    {/* <input type="reset" value=" Reset " /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SuccessfulPopup showPopup={showPopup} closePopup={handleClose} message="Registered"/>
    </>
  );
};

export default Signup;