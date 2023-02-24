import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import LoginFrom from "./components/login/login";
import ListFrom from "./components/view/List";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="dashboard" element={<ListFrom />} />
        <Route path="/" element={<LoginFrom />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
