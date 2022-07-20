import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import TodosPage from "./components/pages/TodosPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
