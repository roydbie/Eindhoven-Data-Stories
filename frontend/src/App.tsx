import ListGroup from "./components/ListGroup";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header></Header>
      <div className="container-xl text-center">
        <div className="topic">Dit wordt dan een card</div>
        <div className="topic">.g-col-6</div>
        <div className="topic">.g-col-6</div>
        <div className="topic">.g-col-6</div>
      </div>
      <br></br>
      <ListGroup></ListGroup>
    </>
  );
}

export default App;
