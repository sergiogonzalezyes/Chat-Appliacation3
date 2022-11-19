import { Navigate } from "react-router-dom";

import { useState } from "react";

export const Login = () => {
    const [userLoginVerify, setuserLoginVerify] = useState(false)

    if (userLoginVerify) {
        return <Navigate to="/UserPage" />
    }


    return <div className="loginComponent">
            <form >
                <label className="name">
                    UserName:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label className="name">
                    Password:
                    <input type="text" name="password" className="input" />
                </label>   
            </form>
            <button className="button" onClick={() => {
                setuserLoginVerify(true);
            }}>button</button>
           </div>;
};
