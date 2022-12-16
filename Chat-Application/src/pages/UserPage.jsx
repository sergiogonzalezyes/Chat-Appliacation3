import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";



export const UserPage = () => {
  

  const [messages, setmessages] = useState("");
  const [savedMessage, setSavedMessage] = useState([]);
  const formRef = useRef(null);
  const [time, setTime] = useState(null);
  const [timeArr, setTimeArr] = useState([]);
  
  

    


  

  function messagesArr () {
    setTime( new Date());
    
    
    
    setSavedMessage([...savedMessage, messages]);
    setTimeArr([...timeArr, time])


    

  }
  



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
        <li className="jon_doe">{savedMessage.map((message, index) => (
          <div key={index}>
            <b className="username_id">John Doe</b>
              <div className="message_time_div">
                <p className="message">{message}</p>
                <p className="time">{timeArr.map((times,index) => (
                <div key={index}>
                  {times}
                </div>
                ))}</p>
              </div>
          </div>))}
    </li>
        </ul>
      </div>
      <div >
        <form id="input-form" ref={formRef} onSubmit={(e) => {e.preventDefault(), formRef.current.reset();}}>
          <div  className="input_form">
          <textarea onChange={(e) => { setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message"></textarea>
          <button className="submit_button" type="submit" onClick={messagesArr}>Send</button>
          </div>
        </form>
      </div>
      </div>
    </div>
    </div>
  )
};