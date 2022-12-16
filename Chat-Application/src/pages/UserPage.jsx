export const UserPage = () => {
  return( 

    <div>
      <head>
    <title>Chatbox</title>
  </head>
  <body>
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
          <li className="jon_doe">
          <b>John Doe</b>
          <div className="message_time_div">
            <p className="message"> Hi, how are you? </p>
            <p className="time">3:53</p>
            </div>
          </li>
        </ul>
      </div>
      <div >
        <form id="input-form">
          <div  className="input_form">
          <textarea className="submit_text_area"  placeholder="Enter a message"></textarea>
          <button className="submit_button" type="submit">Send</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </body>
    </div>
  )
};