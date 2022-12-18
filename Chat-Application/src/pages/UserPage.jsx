import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'
import axios from "axios";
const connection = 'http://localhost:5001'
const socket = io.connect('http://localhost:5001')

// const myPhoneNumber = prompt('what is your number?','')





export const UserPage = () => {

  // const updateUser = async (socketId)=> {
  //   let res = await axios.get(connection + '/UserPage',{
  //     method: 'PUT',
  //     body:JSON.stringify({userName:userName,socketId:socketId}),
  //     //here we are going to fetch the username of the person logged in, the credentionals will be on the log in screen. once we put log in credentionals the user will have a unique id to connect sockets through 47:19
  //     headers: {'content-type':'application/json'}
  //   })
  //   let data = res.json()
  //   console.log(data)
  // }

  // useEffect(()=> {
  //   socket.on("connect", ()=> {
  //     console.log('connected id' + socket.id)
  //     updateUser(socket.id)
  //   })
  //   return ()=> {
  //     socket.off('connect')
  //   }
  // },[])
  

  const [messages, setmessages] = useState("");
  const [savedMessage, setSavedMessage] = useState([]);
  const formRef = useRef(null);
  // const [time, setTime] = useState(null);
  // const [timeArr, setTimeArr] = useState([]);

  
  

    


  

  function messagesArr () {
    // setTime( new Date())
    // let date = time 
    // console.log(date);
    // const message = {
    //   time: date,
    //   text: messages,
    // }
    socket.emit()
    
    setSavedMessage([...savedMessage, messages]);
    // setTimeArr([...timeArr, time])

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
                <p className="time">3:55</p>
              </div>
          </div>))}
    </li>
        </ul>
      </div>
      <div >
        <form id="input-form" ref={formRef} onSubmit={(e) => {e.preventDefault(), formRef.current.reset();}}>
          <div  className="input_form">
          <textarea onChange={(e) => {setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message"></textarea>
          <button className="submit_button" type="submit" onClick={messagesArr}>Send</button>
          </div>
        </form>
      </div>
      </div>
    </div>
    </div>
  )
};