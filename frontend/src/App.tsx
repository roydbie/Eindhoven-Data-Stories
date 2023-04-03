import ListGroup from "./components/ListGroup";
import "./App.css";

function App() {
  return (
    <>
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
