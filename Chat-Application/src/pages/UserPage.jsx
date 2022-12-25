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

  // const handleKeyDown = (event) => {
   
  //   if (event.key === 'Enter') {
  //     // Do something with the input value here
  //     console.log(value);
  //     messagesArr();
  //   }
  // };



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
      <ScrollToBottom className="message.container.number2">
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
        </ul>
      </div>
      </ScrollToBottom>
      <div >
        <div id="input-form" ref={formRef}>
          <div className="input-container">
          <div  className="input_form">
          <textarea onChange={(e) => {setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message" onKeyDown={(e) => handleKeyDown(e)}></textarea>
          <button className="submit_button" type="button" onClick={messagesArr}>Send</button>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
};