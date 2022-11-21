import { Navigate } from "react-router-dom";
import { useState,useState } from "react";
import axios from "axios";

export const Login = () => {
    const [userLoginVerify, setuserLoginVerify] = useState(false);
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    if (userLoginVerify) {
        return <Navigate to="/UserPage" />;
    }

    return (
        <div className="loginComponent">
            <form>
                <label className="name">
                    UserName:
                    <input type="text" name="name" />
                </label>
                <br />
                <label className="name">
                    Password:
                    <input type="text" name="password" className="input" />
                </label>
            </form>
            <button
                className="button"
                onClick={() => {
                    setuserLoginVerify(true);
                }}
            >
                button
            </button>
        </div>
    );
};
