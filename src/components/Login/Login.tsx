import "./Login.scss";

const Login = () => {
  return (
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
              <h2>Get In</h2>
              <form>
                <div className="inputBox">
                  <input type="text" placeholder="Username" />
                </div>
                <div className="inputBox">
                  <input type="submit" value=" Login " />

                  <input type="reset" value=" Reset " />
                </div>
                <p className="forget">
                  Forgot Account?<a href="#"> Click Here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
