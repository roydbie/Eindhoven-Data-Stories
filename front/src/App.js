import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PublicReports from "./pages/PublicReports";
import Playgrounds from "./pages/Playgrounds";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route
          path="publicreports"
          element={<PublicReports></PublicReports>}
        ></Route>
        <Route path="playgrounds" element={<Playgrounds></Playgrounds>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
