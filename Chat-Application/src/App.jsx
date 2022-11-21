import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserPage } from "./pages/UserPage";
import { UserInfo } from "./pages/UserInfo";
import { CreateUser } from "./pages/CreateUser";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="textLogin">
                    {/* <Link to="/">Home</Link> */}
                    <Link to="/Login">Login</Link>
                </div>
                {/* <div>
                    <Link to="/UserInfo">User Info</Link>
                </div> */}
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/UserPage" element={<UserPage />} />
                    <Route path="/UserInfo" element={<UserInfo />} />
                    <Route path="/CreateUser" element={<CreateUser />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
