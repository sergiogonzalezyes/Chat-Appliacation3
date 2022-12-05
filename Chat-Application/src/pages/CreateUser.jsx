import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Person from "../images/Saly-34.png";


export const CreateUser = () => {
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
                SetIncorrectUserName('Username Is already in Use')
            }
        })
      
    }
   
    
    

    if (createNewUser) {
        return <Navigate to="/createUser" />;
    }


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
                    <input type="text" placeholder="Username" name="name" onChange={(e) => {SetuserName(e.target.value)}}/>
                </label>
                <label className="Input_Create_Password">
                    <input type="password" placeholder="Password" name="password" className="input" onChange={(e) => {Setpassword(e.target.value)}} />
                </label>
                <div className="Wrong_Message_Notify">{IncorrectUserName}</div>
            </form>
            <div>
            <button
               className="Home_Buttons_Sign_In"
                onClick={getInput}
            >
                Create Account
            </button>
            
            </div>
                </div>
            
            </div>
        </div>
    );
};

