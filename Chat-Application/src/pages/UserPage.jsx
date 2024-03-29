import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
const socket = io('http://localhost:5000',{
  query: {
    token: localStorage.getItem("token")
  }
})
import axios from "axios";
import {LoadContacts} from "../components/loadContacts";


export const UserPage = () => {
  const formRef = useRef(null);
  const [savedMessage,setSavedMessage] = useState([]);
  const [messages, setmessages] = useState("");
  const [UserName, setUserName] = useState("");
  const [savedContacts, setSavedContacts] = useState([]);
  const [RecipientName, setRecipientName] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/UserPage', {headers:{"x-access-token": localStorage.getItem("token")} }).then((response) => {
      const decodedJWT = response.data.decodedJWT;
      console.log(decodedJWT);
      
      // You can access specific properties of the decoded JWT like this:
      const username = decodedJWT.username;
      setUserName(username);

      

      
    })

  },[])
 
  

  function addContact () {
    let contact_username = prompt("Enter the username of the person you want to add");
    
    axios.post('http://localhost:5000/addContact', {contact_username: contact_username}) .then((response) => {
      console.log(response.data);

      const message = response.data.message;
      const error = response.data.error;
      console.log(message)
      const contact_username = response.data.userName;
      console.log(contact_username);
      const recipientId = (response.data.recepient_id)
      setRecipientName(recipientId);
      console.log(recipientId);
      // (response.data.userName)


      if (error === "This user does not exist") {
        alert("This user does not exist");
      }

      if (error === "Error adding contact") {
        alert("Error adding contact");
      }


      if (message === "Added contact successfully") {
        alert("Contact added successfully");
        setSavedContacts([...savedContacts, contact_username])

      } 
    }
  )}
  

  function messagesArr () {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = new Date().getFullYear();

    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // ' YYYY-MM-DD hh:mm:ss ' is MYSQL DATETIME format


    let userInfo = {
      sender_id: UserName,
      message: messages,
      time:timeString,
      username: UserName,
      recepient_id: RecipientName,
    }

    // socket.emit("send_message", userInfo);


    socket.emit('send_message',{userInfo})
    setSavedMessage((list) => [...list, {userInfo}]);
    console.log(userInfo);

  }

  
   useEffect(() => {
    
    // socket.on('receive_message', (data) => {
      
      
    // })

    socket.on('connection', (data) => {
  

      console.log(data);
      setSavedMessage((list) => [...list, data])
    })
   
  },[socket])


 



  return( 
    <div className="user_container">
    <div className="chatbox">
      <div className="contacts">
        <h1>Contacts</h1>
       <LoadContacts/>
        <ul>
          {savedContacts.map((value,key) => {
            return (
              <li key={key} className="contact_name">
                <p>{value}</p>
              </li>
            )
          })}
        </ul>
        <div className="add_user">
          <button className="add_button" type="button" onClick={addContact}>+</button>
        </div>
      </div>
      <div className="messagesandinputform">
     
      <div className="messages">
        <h1>Messages</h1>
        <ScrollToBottom className="">
        <ul>
        {savedMessage.map((value,key) => {
        return (
          <li key={key} className="message_time_div">
            <p>{value.username}</p>
            <p className="message">{value.message}</p>
            <p className="time">{value.time}</p>
          </li>
        )
       })}
        </ul>
        </ScrollToBottom>
      </div>
  
        <div className="input-form" ref={formRef}>
          <div className="input-container">
          <div  className="input-form-container">
          <textarea onChange={(e) => {setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message"    onKeyPress={(event) => {
                        event.key === "Enter" && messagesArr();
                    }}></textarea>
          <button className="submit_button" type="button" onClick={messagesArr}>Send</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
};