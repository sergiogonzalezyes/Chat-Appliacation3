

import { useState, useEffect } from "react";
import axios from "axios";
import TreeSitter from "../images/Saly-16.png";
import { Navigate } from "react-router-dom";
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000')


export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginsuccess, setLoginSuccess] = useState(false);
    const [incorrectUserName, setIncorrectUserName] = useState("");

    const getInput = () => {
        axios.post('http://localhost:5000/userLogin', { username: username, password: password })
            .then(response => {
                // console.log(response.data.userID)
                if (response.data.auth === true) {
                    setLoginSuccess(true);
                    localStorage.setItem("token", response.data.token)
                } else {
                    setIncorrectUserName('Password is not correct or username does not exist');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        axios.get('http://localhost:5000/UserPage', {headers:{"x-access-token": localStorage.getItem("token")} }).then((response) => {
          const decodedJWT = response.data.decodedJWT;
          console.log(decodedJWT);
          
          // You can access specific properties of the decoded JWT like this:
          const username = decodedJWT.username;
          setUsername(username);
          
        })
    
      },[])


    if (loginsuccess === true) {
        socket.emit("connection");
        console.log("connected")

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
                    <input maxlength="30" type="password" placeholder="Password" name="password" className="input" onChange={(e) => {setPassword(e.target.value)}}  onKeyPress={(event) => {
                        event.key === "Enter" && getInput();
                    }} />
                </label>
                <div className="Valid_UserName">{incorrectUserName}</div>
            </form>
            <div>
            <button
               className="Home_Buttons_Sign_In"
                onClick={getInput}
            >
                Login
            </button>
            {/* <button onClick={sendMessage}>SEND MESSAGE</button> */}
            
            </div>
                </div>
            
            </div>
        </div>
    );
};
