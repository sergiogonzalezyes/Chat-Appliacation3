import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import TreeSitter from "../images/Saly-16.png";

export const Login = () => {
    const [userLoginVerify, setuserLoginVerify] = useState(false);
    const [data, setData] = useState([]);
    const [userName, SetuserName] = useState("");
    const [password, Setpassword] = useState("");
    const [IncorrectUserName, SetIncorrectUserName] = useState("");
    const [createNewUser, setCreateNewUser] = useState(false);



    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
        
    };

    useEffect(() => {
        loadData();
    
    }, []);

    const getInput = () => {
        data.map((loginInfo) => {
            const userNameLowerCase = userName.toLocaleLowerCase() ;
            if(loginInfo.username === userNameLowerCase && loginInfo.password === password){
               setuserLoginVerify(true)
                  
            }else {
                SetIncorrectUserName('UserName does not exist or Password is Incorrect')
            }
        })
      
    }
   
    
    if (userLoginVerify) {
        return <Navigate to="/UserPage" />;
    }

    if (createNewUser) {
        return <Navigate to="/createUser" />;
    }


    return (
        <div className="loginComponent">
            <div className="left">
                <img className="loginImage" src={TreeSitter} alt="" />
            </div>
            <div className="right">
                <div className="right-form">
                <p className="Sign_In">Sign In</p>
                <p className="newUserLogin"
                
                onClick={setCreateNewUser}
            >
                New User? Create an Account
            </p>
                <form>
                <label className="name">
                    {/* <p className="name">UserName:</p> */}
                    <input type="text" placeholder="UserName" name="name" onChange={(e) => {SetuserName(e.target.value)}}/>
                </label>
                <br />
                <label className="name">
                    {/* <p className="name">Password:</p> */}
                    <input type="password" placeholder="Password" name="password" className="input" onChange={(e) => {Setpassword(e.target.value)}} />
                </label>
                <div className="wrongInputMessage">{IncorrectUserName}</div>
            </form>
            <div>
            <button
               className="Home_Buttons"
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
