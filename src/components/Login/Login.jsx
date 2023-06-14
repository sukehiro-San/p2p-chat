import { useSelector } from "react-redux";
import Background from "../Background/Background";

const Login = () => {
  const isAdmin = useSelector(state => state.role.isAdmin);
  return (
    <Background>
      <div className="form">
        <h2>Log In</h2>
        <form>
          {isAdmin && <>
            <div className="inputBox">
            <input type="email" placeholder="User Email" />
          </div>
          <div className="inputBox">
            <input type="password" placeholder="Password" />
          </div>
          </>}
          {!isAdmin && <div className="inputBox">
            <input type="text" placeholder="Employee Code" />
          </div>}
          
          <div className="inputBox">
            <input type="submit" value=" Login " />

            {/* <input type="reset" value=" Reset " /> */}
          </div>
          <p className="forget">
            Forgot Account?<a href="#"> Click Here</a>
          </p>
        </form>
      </div>
    </Background>
  );
};

export default Login;
