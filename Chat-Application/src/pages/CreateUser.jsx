import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";


export const CreateUser = () => {
    const [data, setData] = useState([]);
    const [inputNewUN, SetinputNewUN] = useState("");
    const [inputNewPW, SetinputNewPW] = useState("");
    

const inputNewUserName = (e) => {
    SetinputNewUN(e.target.value)
}

const inputNewPassword = (e) => {
    SetinputNewPW(e.target.value)
}



// componentDidMount() {
//     // Simple POST request with a JSON body using axios
//     const article = { title: 'React POST Request Example' };
//     axios.post('https://reqres.in/api/articles', article)
//         .then(response => this.setState({ articleId: response.data.id }));
// }


const send = () => {
    const article = inputNewUN;
    axios.post('http://localhost:5000', article)
        .then(response => this.useState({ username: response.data.username}))
    // console.log(inputNewUN)
}

const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
        
};

useEffect(() => {
        loadData();
    
}, []);
 
    
    return (
        <div className="loginComponent">
            <form>
                <label className="name">
                    New UserName:
                    <input type="text" name="name" onChange={inputNewUserName}/>
                </label>
                <br />
                <label className="name">
                    New Password:
                    <input type="text" name="password" className="input" onChange={inputNewPassword} />
                </label>
            </form>
            <button
                className="button"
                onClick={send}
            >
                Create
            </button>
        </div>
    );
};
