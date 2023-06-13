import "../Login/Login.scss";

const Signup = () => {
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
              <h2>Sign Up</h2>
              <form>
                <div className="inputBox">
                  <input type="text" placeholder="Username" />
                </div>
                <div className="inputBox">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="inputBox">
                  <input type="submit" value=" Sign Up " />

                  <input type="reset" value=" Reset " />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
