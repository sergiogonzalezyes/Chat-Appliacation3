// import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import TreeSitter from "../images/Saly-16.png";
import { Navigate } from "react-router-dom";




export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginsuccess, setLoginSuccess] = useState(false);
    const [IncorrectUserName, SetIncorrectUserName] = useState("");

    const getInput = () => {
        // const navigate = useNavigate();
        axios.post('http://localhost:5000/userLogin', { username: username, password: password })
       
          .then(response => {
            console.log(response.data)
            console.log(response.data)
            if (response.data.message === 'Login successful') {
                
                return setLoginSuccess(true);
            } 
            if (response.data){
                SetIncorrectUserName('Password is not correct or Username does not exist')

            }
          });
      };

    if (loginsuccess === true) {
        return <Navigate to="/UserPage" />;
    }

    return (
        <div className="loginComponent">
            <div className="Image_Div_Left">
                <img className="Login_Image" src={TreeSitter} alt="" />
            </div>
            <div className="Image_Div_Right">
                <div className="Form_Div">
                <p className="Sign_In">Sign In</p>
                <p className="New_User_Login">
                {/* New User? <a onClick={setCreateNewUser} className="create_account">Create an Account</a> */} 
            </p>
                <form className="Create_user_form">
                <label className="Input_Login">
                    <input maxlength="30" type="text" placeholder="UserName" name="name" onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label className="Input_Password">
                    <input maxlength="30" type="password" placeholder="Password" name="password" className="input" onChange={(e) => {setPassword(e.target.value)}} />
                </label>
                <div className="Valid_UserName">{IncorrectUserName}</div>
            </form>
            <div>
            <button
               className="Home_Buttons_Sign_In"
                onClick={getInput}
            >
                Login
            </button>
            
            </div>
                </div>
            
            </div>
        </div>
    );
};
