import Topics from "../components/Topics";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="row">
      <div className="col-3 ps-3">
        <Topics></Topics>
      </div>
      <div className="col">
        <h1 className="text-light ms-5">Data Leads</h1>
        <div className="container-fluid">
          <Link to="publicreports" className="card topic">
            <img
              src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-secondary">
              <span>
                <i className="bi bi-flower1" style={{ fontSize: "1.2rem" }}></i>
                <i
                  className="bi bi-house ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-people-fill ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-trash3 ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </span>
              <h3 className="card-title text-light mt-3">Public reports</h3>
            </div>
          </Link>

          <div className="card topic">
            <img
              src="https://images.pexels.com/photos/4430308/pexels-photo-4430308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-secondary">
              <span>
                <i className="bi bi-geo" style={{ fontSize: "1.2rem" }}></i>
                <i
                  className="bi bi-people-fill ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-dribbble ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-emoji-smile ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </span>
              <h3 className="card-title text-light mt-3">Playgrounds</h3>
            </div>
          </div>

          <div className="card topic">
            <img
              src="https://images.pexels.com/photos/3935316/pexels-photo-3935316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-secondary">
              <span>
                <i className="bi bi-houses" style={{ fontSize: "1.2rem" }}></i>
                <i
                  className="bi bi-currency-exchange ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-tree ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  className="bi bi-emoji-smile ms-3"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </span>
              <h3 className="card-title text-light mt-3">Property value</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
