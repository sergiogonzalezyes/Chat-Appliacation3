// import { Navigate } from "react-router-dom";
// import { useState,useEffect } from "react";
// import axios from "axios";


// export const CreateUser = () => {
//     const [data, setData] = useState([]);
//     const [inputNewUN, SetinputNewUN] = useState("");
//     const [inputNewPW, SetinputNewPW] = useState("");
    

// const inputNewUserName = (e) => {
//     SetinputNewUN(e.target.value)
// }

// const inputNewPassword = (e) => {
//     SetinputNewPW(e.target.value)
// }



// // componentDidMount() {
// //     // Simple POST request with a JSON body using axios
// //     const article = { title: 'React POST Request Example' };
// //     axios.post('https://reqres.in/api/articles', article)
// //         .then(response => this.setState({ articleId: response.data.id }));
// // }


// const send = () => {
//     const article = inputNewUN;
//     axios.post('http://localhost:5000', article)
//         .then(response => this.useState({ username: response.data.username}))
//     // console.log(inputNewUN)
// }

// const loadData = async () => {
//         const response = await axios.get("http://localhost:5000/api/get");
//         setData(response.data);
        
// };

// useEffect(() => {
//         loadData();
    
// }, []);
 
    
//     return (
//         <div className="loginComponent">
//             <form>
//                 <label className="name">
//                     New UserName:
//                     <input type="text" name="name" onChange={inputNewUserName}/>
//                 </label>
//                 <br />
//                 <label className="name">
//                     New Password:
//                     <input type="text" name="password" className="input" onChange={inputNewPassword} />
//                 </label>
//             </form>
//             <button
//                 className="button"
//                 onClick={send}
//             >
//                 Create
//             </button>
//         </div>
//     );
// };








// ********************************************************************************************





import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";


export function CreateUser() {
    const[username, setUsername]= useState('');
    const[userpassword, setUserPassword]= useState('');
    // const[message, setMessage]= useState('');

        const handleusername =(event)=>{
            const user_name=event.target.value;
            console.log(user_name);
            setUsername(user_name);
        }

        const handleuserpassword =(event)=>{
            const user_password=event.target.value;
            console.log(user_password);
            setUserPassword(user_password);
        }

        const submitUser= async (e)=> {
            e.preventDefault();
            const userdata ={ user_name:username, user_password:userpassword };
            
            
            await axios.post('http://127.0.0.1:5000/createUser', JSON.stringify(userdata) )
            .then(result=>{ 
                console.log(result);
                // setMessage(result.data.msg);});
            

            // console.log(result.data.msg);
            });
        }

    return (
        <React.Fragment>
            <div className="loginComponent">
        {/* 
                { message ? <div className="text-success"> { message } </div> :  <></>} */}
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

