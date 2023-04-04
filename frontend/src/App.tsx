import TopicMenu from "./components/TopicMenu";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header></Header>
      <div className="row">
        <div className="col-2 ps-3">
          <TopicMenu></TopicMenu>
        </div>
        <div className="col px-3">
          <h1 className="text-light ms-5">Data Leads</h1>
          <div className="container-fluid text-center">
            <div className="topic">Dit wordt dan een card</div>
            <div className="topic">.g-col-6</div>
            <div className="topic">.g-col-6</div>
            <div className="topic">.g-col-6</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
