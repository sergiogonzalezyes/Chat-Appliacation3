import React from "react"
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';


// also if the id of the user is needed to make the query to get the friends list we can use a 
// search query using our current username to get the id which in return will use that id to make the query for the list of users 



export const LoadContacts = (props) => {
  const [UserName, setUserName] = useState('')
  const [savedContacts, setSavedContacts] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/UserPage', {headers:{"x-access-token": localStorage.getItem("token")} }).then((response) => {
      const decodedJWT = response.data.decodedJWT;
      console.log(decodedJWT);
      
      // You can access specific properties of the decoded JWT like this:
      const username = decodedJWT.username;
      setUserName(username);

    })

  },[])

  useEffect(() =>{
    axios.post('http://localhost:5000/loadContacts', { username: UserName})
    .then(response => {
      console.log(response);

      const savedContacts = response.data;
      setSavedContacts(savedContacts);
      console.log(savedContacts); 

    })
    .catch(error => {
      console.error(error);
    });

  },[UserName])
 

return (<div>
        <ScrollToBottom className="">
        <ul>
        {savedContacts.map((value,key) => {
        return (
          <li key={key} className="message_time_div">
            {value.username}
          </li>
        )
       })}
        </ul>
        </ScrollToBottom>
      </div>)
};