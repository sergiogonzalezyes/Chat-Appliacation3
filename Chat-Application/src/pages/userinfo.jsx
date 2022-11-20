import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

// console.log(axios.isCancel('something'));  research what this is later..

export const UserInfo = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data)
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{marginTop: "10px"}}>
            <table className="styled">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h2> UserInfo </h2>
            <h1 className="UserInfoPage">Hello,we got some jobs ready for you.</h1>
        </div>       
    )
};