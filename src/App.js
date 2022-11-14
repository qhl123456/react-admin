import React from "react";
import "./App.css";
import Home from "./layout/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
class App extends React.PureComponent {
  render() {
    if (!sessionStorage.getItem("username")) {
      return <Login />;
    } else {
      return <Home />;
    }
  }
}
export default App;
