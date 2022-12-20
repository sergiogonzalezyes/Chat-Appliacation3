// // import { Navigate } from "react-router-dom";
// import { useState,useEffect } from "react";
// import axios from "axios";
// import TreeSitter from "../images/Saly-16.png";
// import { Navigate } from "react-router-dom";
// const connection = 'http://localhost:5001'
// const socket = io.connect('http://localhost:5001')
// import io from 'socket.io-client'




// export const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loginsuccess, setLoginSuccess] = useState(false);
//     const [IncorrectUserName, SetIncorrectUserName] = useState("");

//     const getInput = () => {
//         // const navigate = useNavigate();
//         axios.post('http://localhost:5000/userLogin', { username: username, password: password })
       
//           .then(response => {
//             console.log(response.data)
//             console.log(response.data)
//             if (response.data.message === 'Login successful') {
                
//                 return setLoginSuccess(true);
//             } 
//             if (response.data){
//                 SetIncorrectUserName('Password is not correct or Username does not exist')

//             }
//           });
//       };

//     if (loginsuccess === true) {
//         const updateUser = async (socketId)=> {
//             let res = await axios.get(connection + '/UserPage',{
//               method: 'PUT',
//               body:JSON.stringify({userName:userName,socketId:socketId}),
//               //here we are going to fetch the username of the person logged in, the credentionals will be on the log in screen. once we put log in credentionals the user will have a unique id to connect sockets through 47:19
//               headers: {'content-type':'application/json'}
//             })
//             let data = res.json()
//             console.log(data)
//           }
        
//           {
//             socket.on("connect", ()=> {
//               console.log('connected id' + socket.id)
//               updateUser(socket.id)
//             })
//             return ()=> {
//               socket.off('connect')
//             }
//           }

//         return <Navigate to="/UserPage" />;
//     }




import { useState, useEffect } from "react";
import axios from "axios";
import TreeSitter from "../images/Saly-16.png";
import { Navigate } from "react-router-dom";
import io from 'socket.io-client';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginsuccess, setLoginSuccess] = useState(false);
    const [incorrectUserName, setIncorrectUserName] = useState("");

    const getInput = () => {
        axios.post('http://localhost:5000/userLogin', { username: username, password: password })
            .then(response => {
                if (response.data.message === 'Login successful') {
                    setLoginSuccess(true);
                } else {
                    setIncorrectUserName('Password is not correct or username does not exist');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // useEffect(() => {
    //     if (loginsuccess === true) {
    //         const socket = io.connect('http://localhost:5001');
    //         socket.emit("messages", () => {
    //             console.log('connected to id' + socket.id);
    //         });
    //         return () => {
    //             socket.off('messages');
    //         }
    //     }
    // }, [loginsuccess]);

    // const sendMessage = () =>{
    //     const socket = io.connect('http://localhost:5001');
        
    //     socket.emit("send_message", {message: "hello"});
    // };

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
