import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'
import axios from "axios";
import { Await } from "react-router-dom";
const connection = 'http://localhost:5000'
const socket = io.connect('http://localhost:5000')

// const myPhoneNumber = prompt('what is your number?','')



// const socket = io.connect('http://localhost:5001');

export const UserPage = () => {
  const formRef = useRef(null);
  const [savedMessage,setSavedMessage] = useState([])
  const [messages, setmessages] = useState("");
  




  function messagesArr () {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours}:${minutes}`;

    socket.emit("send_message", {message:messages, time:timeString});
    setSavedMessage((list) => [...list, {message: messages, time: timeString}]);
  }

  
   useEffect(() => {
    
    socket.on('receive_message', (data) => {
      
      setSavedMessage((list) => [...list, data])
    })
   
  },[socket])
  
  // useEffect(() => {
   
  // }, [ReceiveMessage])


  // const mergedArr = [...savedMessage,...incomingMessage];
  
  // mergedArr.sort((a,b) => {
  //  return a.time - b.time
    
  // });
  // console.log(mergedArr);

  

  return( 
    <div className="user_container">
    <div id="chatbox">
      <div id="contacts">
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
      <div id="messagesandinputform">
      <div id="messages">
        <h1>Messages</h1>
        <ul>
        {savedMessage.map((value,key) => {
        return (
          <li key={key}>
            <p>{value.message}</p>
            <p>{value.time}</p>
          </li>
        )
       })}
       {/* {savedMessage.map((value,key) => {
        return (
          <li key={key}>
            <p>{value.message}</p>
            <p>{value.time}</p>
          </li>
        )
       })}
        {incomingMessage.map((value,key) => {
        return (
          <li key={key}>
            <p>{value.message}</p>
            <p>{value.time}</p>
          </li>
        )
       })} */}
       
        </ul>
      </div>
      <div >
        <div id="input-form" ref={formRef}>
          <div  className="input_form">
          <textarea onChange={(e) => {setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message"></textarea>
          <button className="submit_button" type="submit" onClick={messagesArr}>Send</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
};