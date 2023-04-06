import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
function Topic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get("url");

  const { data, loading, error } = useFetch("http://127.0.0.1:7777/" + url);

  if (loading) return <div className="spinner-border" role="status"></div>;
  if (error) console.log(error);

  return (
    <div className="row">
      <div className="col-3 ps-3">&nbsp;</div>
      <div className="col">
        <h1 className="text-light ms-5">{data?.title}</h1>
        <div className="container-fluid">
          <p className="text-light">{data?.data}</p>
        </div>
      </div>
    </div>
  );
}

export default Topic;
