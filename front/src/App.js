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
        &nbsp;
      </div>
      <Routes>
        <Route path="/" element={<Incomevs></Incomevs>}></Route>
        <Route
          path="publicreports"
          element={<PublicReports></PublicReports>}
        ></Route>
        <Route path="playgrounds" element={<Playgrounds></Playgrounds>}></Route>
        <Route path="incomevs" element={<Index></Index>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
