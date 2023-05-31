import { useLocation } from "react-router-dom";
import { useState } from "react";

function OpenAiResponse(props) {
  const location = useLocation();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchText = async () => {
    const result = await fetch(
      location.pathname +
        "/text?category1=" +
        props.xCategory +
        "&category2=" +
        props.yCategory
    );
    const jsonResult = await result.json();
    setText(jsonResult);
    console.log(jsonResult);
  };

  fetchText();

  const updateText = async () => {
    setLoading(true);
    const result = await fetch(
      location.pathname +
        "/updatetext?category1=" +
        props.xCategory +
        "&category2=" +
        props.yCategory
    );
    const jsonResult = await result.json();
    setText(jsonResult);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-left" style={{ height: 500, marginTop: 50 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );

  if (!loading) {
    return (
      <>
        <h5 className="text-light mt-2 ps-2">
          Open AI's opinion about the data:
        </h5>
        <p className="text-light my-2 ps-2 w-50" style={{ fontSize: "0.9rem" }}>
          {text}
        </p>
        <p className="text-light mt-2 ps-2">
          Does this response not make sense?
        </p>
        <button
          className="btn btn-success ms-2 mb-5"
          style={{ fontSize: "0.9rem" }}
          onClick={() => updateText()}
        >
          Update response
        </button>
      </>
    );
  }
}

export default OpenAiResponse;
