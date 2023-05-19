import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

function OpenAiResponse(props) {
  const location = useLocation();

  const { data, loading, error } = useFetch(
    "http://127.0.0.1:7777" +
      location.pathname +
      "/text?category1=" +
      props.xCategory +
      "&category2=" +
      props.yCategory
  );

  function handleThumbsDown() {
    axios
      .get(
        "http://127.0.0.1:7777" +
          location.pathname +
          "/updatescore?category1=" +
          props.xCategory +
          "&category2=" +
          props.yCategory +
          "&update=minus",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => window.location.reload(false));
  }

  function handleThumbsUp() {
    axios
      .get(
        "http://127.0.0.1:7777" +
          location.pathname +
          "/updatescore?category1=" +
          props.xCategory +
          "&category2=" +
          props.yCategory +
          "&update=plus",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => window.location.reload(false));
  }

  if (loading)
    return (
      <div className="text-center" style={{ height: 500, marginTop: 50 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  if (error) console.log(error);

  if (data) {
    return (
      <>
        <h5 className="text-light mt-2 ps-2">
          Open AI's opinion about the data:
        </h5>
        <p className="text-light my-2 ps-2" style={{ fontSize: "0.9rem" }}>
          {data}
        </p>
        <h5 className="text-light mt-2 ps-2">
          How do you think about this answer?
        </h5>
        <button
          className="btn btn-success ms-2 mb-5"
          style={{ fontSize: "0.9rem" }}
          onClick={handleThumbsUp}
        >
          &#128077;
        </button>
        <button
          className="btn btn-danger ms-2 mb-5"
          style={{ fontSize: "0.9rem" }}
          onClick={handleThumbsDown}
        >
          &#128078;
        </button>
      </>
    );
  }
}

export default OpenAiResponse;
