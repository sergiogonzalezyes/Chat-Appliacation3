export const UserPage = () => {
  return( <div className="UserPageDiv">
    <form action="/action_page.php" class="form-container">
      <textarea placeholder="Type message.." name="msg" required></textarea>
    </form>
    <button type="submit" class="btn">Send</button>
    <button type="button" class="btn cancel">cancel</button>
          </div>
          
          )
};