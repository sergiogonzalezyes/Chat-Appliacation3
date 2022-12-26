import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
const socket = io.connect('http://localhost:5000')


export const UserPage = () => {
  const formRef = useRef(null);
  const [savedMessage,setSavedMessage] = useState([])
  const [messages, setmessages] = useState("");
  const [UserName, setUserName] = useState("");



  useEffect(() => {
    
    socket.on('receive_username', (username) => {
      
      setUserName(username)
    })
   
  },[socket])


  function messagesArr () {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours}:${minutes}`;


    let userInfo = {
      message: messages,
      time:timeString,
      username: UserName,
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
    <div className="UserPage">

      <div className="Sidebar">
      </div>

      <div className="Chat">
      </div>

      </div>
  )
};