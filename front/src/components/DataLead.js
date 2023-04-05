import { Link } from "react-router-dom";

function DataLead(props) {
  return (
    <Link to={props.link} className="card topic">
      <img src={props.image} className="card-img-top" alt="..." />
      <div className="card-body text-secondary">
        <span>
          {props.icons.map((element, i) => {
            return (
              <i
                className={element + " me-3"}
                style={{ fontSize: "1.2rem" }}
                key={i}
              ></i>
            );
          })}
        </span>
        <h3 className="card-title text-light mt-3">{props.title}</h3>
      </div>
    </Link>
  );
}

export default DataLead;
