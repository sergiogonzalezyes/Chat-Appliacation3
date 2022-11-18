export const Login = () => {
    return <div className="loginComponent">
            <form >
                <label className="name">
                    UserName:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label className="name">
                    Password:
                    <input type="text" name="password" />
                </label>   
            </form>
            <button className="button">Submit</button>
           </div>;
};
