import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PublicReports from "./pages/PublicReports";
import Playgrounds from "./pages/Playgrounds";
import Incomevs from "./pages/Incomevs";

function App() {
  return (
    <BrowserRouter>
      <div className="w-100" style={{ height: 50 }}>
        jo
      </div>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route
          path="publicreports"
          element={<PublicReports></PublicReports>}
        ></Route>
        <Route path="playgrounds" element={<Playgrounds></Playgrounds>}></Route>
        <Route path="incomevs" element={<Incomevs></Incomevs>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
