import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export const Login = () => {
    const [userLoginVerify, setuserLoginVerify] = useState(false);
    const [data, setData] = useState([]);
    const [input, Setinput] = useState("");
    const [input2, Setinput2] = useState("");
    const [createNewUser, setCreateNewUser] = useState(false);


const inputfunction = (e) => {
    Setinput(e.target.value)

}
const inputfunctionPassword = (e) => {
    Setinput2(e.target.value)

}

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
        
    };

    useEffect(() => {
        loadData();
    
    }, []);

    const getInput = () => {
        data.map((datas,key,index) => {
            if(datas.username === input && datas.password === input2){
               setuserLoginVerify(true)
                  
            }else {
                // console.log('no username')
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
                    <input type="text" name="name" onChange={inputfunction}/>
                </label>
                <br />
                <label className="name">
                    Password:
                    <input type="text" name="password" className="input" onChange={inputfunctionPassword} />
                </label>
            </form>
            <button
                className="button"
                onClick={getInput}
            >
                Login
            </button>
            <button
                className="createUser"
                onClick={setCreateNewUser}
            >
                Create New Account
            </button>
        </div>
    );
};
