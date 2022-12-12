import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Person from "../images/Saly-34.png";


export const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const addUser = () => {
        axios.post('http://localhost:5000/createUser', {username: username, password: password}).then(() => {
            console.log("Success");
        });
    };

    return (
        <div className="loginComponent">
            <div className="Image_Div_Left">
                <img className="Login_Image" src={Person} alt="" />
            </div>
            <div className="Image_Div_Right">
                <div className="Form_Div">
                <p className="Sign_In">New User</p>
                <form>
                <label className="Input_Created_User">
                    <input type="text" placeholder="Username" name="name" onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label className="Input_Create_Password">
                    <input type="password" placeholder="Password" name="password" className="input" onChange={(e) => {setPassword(e.target.value)}} />
                </label>
            </form>
            <div>
            <button
               className="Home_Buttons_Sign_In"
                onClick={addUser}
            >
                Create Account
            </button>
            
            </div>
                </div>
            
            </div>
        </div>
    );
};

