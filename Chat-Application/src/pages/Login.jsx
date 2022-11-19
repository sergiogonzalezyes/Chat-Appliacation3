// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import { UserPage } from "./UserPage";

export const Login = () => {
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
            <button className="button">button</button>
           </div>;
};
