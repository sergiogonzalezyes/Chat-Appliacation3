// import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import TreeSitter from "../images/Saly-16.png";

export const Login = () => {
    // const [userLoginVerify, setuserLoginVerify] = useState(false);
    // const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = Navigate()
    // const [IncorrectUserName, SetIncorrectUserName] = useState("");
    // const [createNewUser, setCreateNewUser] = useState(false);

    const getInput = () => {
        // const navigate = useNavigate();
        axios.post('http://localhost:5000/userLogin', { username: username, password: password })
          .then(response => {
            console.log(response)
            if (response.data.message === 'Login successful') {
              return console.log('it worked')
            }
          });
      };


    // const loadData = async () => {
    //     const response = await axios.get("http://localhost:5000/api/get");
    //     console.log(response.data);
    //     // setData(response.data);
        
        
    // };

    // useEffect(() => {
    //     loadData();
    
    // }, []);

    // const getInput = () => {
    //     data.map((loginInfo) => {
    //         const userNameLowerCase = userName.toLocaleLowerCase() ;
    //         console.log(data);
    //         if(loginInfo.username === userNameLowerCase && loginInfo.password === password){
    //            setuserLoginVerify(true)
                  
    //         }else {
    //             SetIncorrectUserName('UserName does not exist or Password is Incorrect')
    //         }
    //     })
      
    // }
   
    
    // if (getInput) {
    //     return <Navigate to="/UserPage" />;
    // }

    // if (createNewUser) {
    //     return <Navigate to="/createUser" />;
    // }


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
                <form>
                <label className="Input_Login">
                    <input type="text" placeholder="UserName" name="name" onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label className="Input_Password">
                    <input type="password" placeholder="Password" name="password" className="input" onChange={(e) => {setPassword(e.target.value)}} />
                </label>
                {/* <div className="Wrong_Message_Notify">{IncorrectUserName}</div> */}
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
