import { useDispatch } from "react-redux";
import { handleAdmin, handleEmployee } from "../../store/slice/roleSlice";
import Background from "../Background/Background";
import "./Home.scss"
import { useNavigate } from "react-router";
function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAdminClick = (e) => {
        e.preventDefault()
        dispatch(handleAdmin())
        navigate("/login") 
    }
    const handleEmployeeClick = (e) => {
        e.preventDefault()
        dispatch(handleEmployee())
        navigate("/login")
    }
  return (
    <Background>
      <div className="form">
        <h2>Welcome!</h2>
        <p>Choose your designation</p>
        <form>
          <div className="inputBox">
            <input className="homeButton" type="button" value=" Admin/HR " onClick={(e) => handleAdminClick(e)}/>
            <input className="homeButton" type="button" value=" Employee " onClick={(e) => handleEmployeeClick(e)}/>
          </div>
        </form>
      </div>
    </Background>
  );
}

export default Home;
