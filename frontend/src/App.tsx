import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import PublicReports from "./pages/PublicReports";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
