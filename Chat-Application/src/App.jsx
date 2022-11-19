import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserPage } from "./pages/UserPage";

function App() {
    return (
        <div className="App">
            <Router> 
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/UserPage" element={<UserPage />} />

                </Routes>
                <div className="textLogin">
                    <Link to="/">Home</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/UserPage">UserPage</Link>

                </div>
            </Router>
        </div>
      
    );
}

export default App;
