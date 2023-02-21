import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;