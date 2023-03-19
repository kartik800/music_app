import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
