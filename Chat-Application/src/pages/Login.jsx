import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

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
            <form>
                <label className="name">
                    UserName:
                    <input type="text" name="name" onChange={(e) => {SetuserName(e.target.value)}}/>
                </label>
                <br />
                <label className="name">
                    Password:
                    <input type="password" name="password" className="input" onChange={(e) => {Setpassword(e.target.value)}} />
                </label>
                <div className="wrongInputMessage">{IncorrectUserName}</div>
            </form>
            <button
               className="Home_Buttons"
                onClick={getInput}
            >
                Login
            </button>
            <button 
                className="Home_Buttons"
                onClick={setCreateNewUser}
            >
                Create New Account
            </button>
        </div>
    );
};
