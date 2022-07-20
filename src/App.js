import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TodosPage from "./components/TodosPage";

function App({ props }) {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage name={props.userName} />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
