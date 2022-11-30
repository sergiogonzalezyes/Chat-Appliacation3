import { Navigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from "axios";
// import { get } from "http";


export function CreateUser() {
    const[username, setUsername]= useState('');
    const[userpassword, setUserPassword]= useState('');
    const [data, setData] = useState([]);
    const [isTrue,setisTrue] = useState(false);

        const handleusername =(event)=>{
            const username=event.target.value;
            console.log(username);
            setUsername(username);
        }

        const handleuserpassword =(event)=>{
            const userpassword=event.target.value;
            console.log(userpassword);
            setUserPassword(userpassword);
        }
        const loadData = async () => {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(response.data);
            
        };
    
    
        const submitUser= async (e)=> {
            e.preventDefault(); 
            const userdata ={ username:username, password:userpassword };
            loadData();
            // getInput();
            
            data.map((loginInfo) => {
                const usernames = loginInfo.username;
                console.log(usernames)

            if (usernames === username){
                setisTrue(false);
                console.log('it is false')   
            } else {
                setisTrue(true);
                console.log('it is true') 
            }   
            })
            // what is happening is that its running through the code and the last name in the array sets the true or false value so it only works if the last username = the input username, maybe find a way to stop the loop as soon as we meet the first username = input username

            if (isTrue === true){
                axios.post('http://127.0.0.1:5000/createUser', userdata )
                .then(result=>{ 
                    console.log(result);});
            }
           

            
            
            
            
        }
        // const getInput = () => {
           
          
        // }

    return (
        <React.Fragment>
            <div className="loginComponent">
                    <form onSubmit={ submitUser } >
                    <label className="name">
                    New UserName:
                    <input type="text" name="user_name" onChange={(e)=> handleusername(e)} />
                </label>
                <br />
                <label className="name">
                    New Password:
                    <input type="text" name="user_password" onChange={(e)=> handleuserpassword(e)} />
                </label>
                <button
                type="submit"
                className="button"
            >
                Create
            </button>
            </form>
            </div>
        </React.Fragment>
    )
}

