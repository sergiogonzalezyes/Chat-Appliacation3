import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Person from "../images/Saly-34.png";


export const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [IncorrectUserName, SetIncorrectUserName] = useState("");
    const [usernameCreated, setusernameCreated] = useState(false);

    const addUser = () => {

        axios.post('http://localhost:5000/createUser', {username: username, password: password}).then((response) => {
            const res = response.data;
            if (res == 'Record Insert Successful'){
                alert('UserName and Password has been created')
                setusernameCreated(true)
                
            } else if (res == 'not working') {
                SetIncorrectUserName('password is not secure. Please use One lower case,One UpperCase,One symbol and One number. Also has to be above 8 characters');
            } else if (res == 'Username already exists') {
                SetIncorrectUserName('Username already exists choose another');
            } else if (res == 'Error checking for existing username') {
                SetIncorrectUserName('Sorry our server is undergoing maintenance');
            }
        });
    };
    if (usernameCreated === true) {
        return <Navigate to="/Login" />;
    }

    return (
        <div className="loginComponent">
            <div className="Image_Div_Left">
                <img className="Login_Image" src={Person} alt="" />
            </div>
            <div className="Image_Div_Right">
                <div className="Form_Div">
                <p className="Sign_In">New User</p>
                <form className="Create_user_form">
                <label className="Input_Created_User">
                    <input  maxlength="30" type="text" placeholder="Username" name="name" onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label className="Input_Create_Password">
                    <input maxlength="30" type="password" placeholder="Password" name="password" className="input" onChange={(e) => {setPassword(e.target.value)}} />
                    <div className="Valid_UserName">{IncorrectUserName}</div> 
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

