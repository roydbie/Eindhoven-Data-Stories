import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route
          path="publicreports"
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;