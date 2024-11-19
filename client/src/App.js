import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import EachTask from "./Components/EachTask/EachTask";

function App() {
  return (
    <div className="App">
      <AllRoutes />
   
    </div>
  );
}

export default App;
