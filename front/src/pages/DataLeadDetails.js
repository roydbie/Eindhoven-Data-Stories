import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

function DataLeadDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get("url");

  const { data, loading, error } = useFetch("http://127.0.0.1:7777/" + url);

  if (loading) return <div className="spinner-border" role="status"></div>;
  if (error) console.log(error);

  return (
    <div className="row">
      <div className="col-3 ps-3">
        <Link
          to="/"
          className="btn btn-sm btn-outline-light mt-2"
          style={{ float: "right" }}
        >
          <i className="bi bi-arrow-left"></i>
        </Link>
      </div>
      <div className="col">
        <h1 className="text-light ms-5">{data?.title}</h1>
        <div className="container-fluid">
          <p className="text-light">{data?.data}</p>
        </div>
      </div>
    </div>
  );
}

export default DataLeadDetails;
