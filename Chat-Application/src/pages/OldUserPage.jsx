// import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";
// import io from 'socket.io-client'
// import axios from "axios";
// import { Await } from "react-router-dom";
// const connection = 'http://localhost:5001'
// const socket = io.connect('http://localhost:5001')

// // const myPhoneNumber = prompt('what is your number?','')



// // const socket = io.connect('http://localhost:5001');

// export const UserPage = () => {
//   const formRef = useRef(null);
//   const [savedMessage,setSavedMessage] = useState([])
//   const [messages, setmessages] = useState("");
//   const [incomingMessage, setIncomingMessage] = useState([]);
//   const [ReceiveMessage,setReceiveMessage] = useState("")



//   function messagesArr () {
//     const currentTime = Date.now();

//     socket.emit("send_message", {message: messages, time:currentTime});
//     setSavedMessage([...savedMessage, {message: messages, time: currentTime}]);
//   }

  
//    useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data.message);
//      setReceiveMessage({message: data.message, time: data.time})
//     })
    
//   },[socket])
  
//   useEffect(() => {
//     setIncomingMessage([...incomingMessage, ReceiveMessage])
//   }, [ReceiveMessage])


//   // const mergedArr = [...savedMessage,...incomingMessage];
  
//   // mergedArr.sort((a,b) => {
//   //   a.time - b.time
//   // });

  






  



//   return( 
//     <div className="user_container">
//     <div id="chatbox">
//       <div id="contacts">
//         <h1>Contacts</h1>
//         <ul>
//           <li>John Doe</li>
//           <li>Jane Smith</li>
//           <li>Bob Johnson</li>
//         </ul>
//         <div className="add_user">
//           <button className="add_button">+</button>
//         </div>
//       </div>
//       <div id="messagesandinputform">
//       <div id="messages">
//         <h1>Messages</h1>
//         <ul>
//         <li className="jon_doe">{incomingMessage.map((messages1,  index) => (
//           <div key={index}>
//             <b className="username_id">John Doe</b>
//               <div className="message_time_div">
//                 <p className="message">{messages1.message}</p>
//                 <p className="time">{messages1.time}</p>
//               </div>
//           </div>))}  
//     </li> 
//         <li className="jon_doe">{savedMessage.map((message, index) => (
//           <div key={index}>
//             <b className="username_id">John Doe</b>
//               <div className="message_time_div">
//                 <p className="message">{message.messages}</p>
//                 <p className="time">{message.time}</p>
//               </div>
//           </div>))}  
//     </li> 
//         </ul>
//       </div>
//       <div >
//         <form id="input-form" ref={formRef} onSubmit={(e) => {e.preventDefault(), formRef.current.reset();}}>
//           <div  className="input_form">
//           <textarea onChange={(e) => {setmessages(e.target.value)}} className="submit_text_area"  placeholder="Enter a message"></textarea>
//           <button className="submit_button" type="submit" onClick={messagesArr}>Send</button>
//           </div>
//         </form>
//       </div>
//       </div>
//     </div>
//     </div>
//   )
// };