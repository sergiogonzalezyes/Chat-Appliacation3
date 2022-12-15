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
      </div>
      <div id="messagesandinputform">
      <div id="messages">
        <h1>Messages</h1>
        <ul>
          <li>
            <p><b>John Doe:</b> Hi, how are you?</p>
          </li>
          <li>
            <p><b>Jane Smith:</b> I'm doing well, thanks. How about you?</p>
          </li>
          <li>
            <p><b>John Doe:</b> I'm doing pretty good, thanks for asking.</p>
          </li>
        </ul>
      </div>
      <div id="input-form">
        <form>
          <textarea placeholder="Enter a message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
      </div>
    </div>
  </body>
    </div>
  )
};