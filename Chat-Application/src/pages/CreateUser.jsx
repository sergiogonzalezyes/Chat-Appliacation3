import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


export function CreateUser() {
    const[username, setUsername]= useState('');
    const[userpassword, setUserPassword]= useState('');
    // const[userDoesnotExist, setuserDoesnotExist]= useState(submitUser);


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


        // const fetchData = async () => {
            
               
    
               
    
        //     };
        
            // useEffect(() => {
            //     loadData();
            // }, []);
        

        const loadData = async (e)=> {
            e.preventDefault(); 
            const userdata ={ username:username, password:userpassword };

            const doeswork =  await axios.post('http://127.0.0.1:5000/createUser', userdata )
            .then(result=>{ 
                console.log(result);
            });

            const response = await axios.get("http://localhost:5000/api/get");
                    for (let i = 0; i < 10; i++) {
                        let existingUserName = response.data[`${i}`].username;
        
                        if (existingUserName === username){
                            if (doeswork) {
                                console.log('working')
                            
                        } 
                      }else {
                            
                        console.log('not made yet')
                    }

                }
            
        }

    return (
        <React.Fragment>
            <div className="loginComponent">
                    <form onSubmit={ loadData } >
                    <label className="name">
                    New UserName:
                    <input type="text" name="user_name" onChange={(e)=> handleusername(e)} />
                </label>
                <br />
                <label className="name">
                    New Password:
                    <input type="password" name="user_password" onChange={(e)=> handleuserpassword(e)} />
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

