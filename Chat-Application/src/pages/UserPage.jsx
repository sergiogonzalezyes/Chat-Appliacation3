import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
const socket = io.connect('http://localhost:5000')
import axios from "axios";



export const UserPage = () => {
  const formRef = useRef(null);
  const [savedMessage,setSavedMessage] = useState([])
  const [messages, setmessages] = useState("");
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/UserPage', {headers:{"x-access-token": localStorage.getItem("token")} }).then((response) => {
      const decodedJWT = response.data.decodedJWT;
      console.log(decodedJWT);
      
      // You can access specific properties of the decoded JWT like this:
      const username = decodedJWT.username;
      setUserName(username);
      
    })

  },[])
 
  




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
      message: messages,
      time:timeString,
      username: UserName
    }

    socket.emit("send_message", userInfo);
    setSavedMessage((list) => [...list, userInfo]);
  }

  
   useEffect(() => {
    
    socket.on('receive_message', (data) => {
      
      setSavedMessage((list) => [...list, data])
    })
   
  },[socket])

 

  return( 
    <div className="user_container">
    <div className="chatbox">
      <div className="contacts">
        <h1>Contacts</h1>
        <ul>
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Bob Johnson</li>
        </ul>
        <div className="add_user">
          <button className="add_button">+</button>
        </div>
      </div>
      <div className="messagesandinputform">
     
      <div className="messages">
        <h1>Messages</h1>
        <ScrollToBottom className="message.container.number2">
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
          <div  className="input_form">
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