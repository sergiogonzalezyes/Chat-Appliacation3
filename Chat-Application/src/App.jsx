import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserPage } from "./pages/UserPage";
import { UserInfo } from "./pages/UserInfo";
import { CreateUser } from "./pages/CreateUser";
// import computerGuy from "./images/section1.png";
// import { PageLayout } from "./components/pagelayout";




function App() {
    return (
        <div className="App">
             
            <Router>
                <nav className="textLogin">
                    <Link to="/">Home</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/CreateUser">Create Account</Link>
                    <Link to="/UserInfo">About Us</Link>
                </nav>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/UserPage" element={<UserPage />} />
                    <Route path="/UserInfo" element={<UserInfo />} />
                    <Route path="/CreateUser" element={<CreateUser />} />
                </Routes>
            </Router>
            {/* <PageLayout /> */}
        </div>
    );
}

export default App;
