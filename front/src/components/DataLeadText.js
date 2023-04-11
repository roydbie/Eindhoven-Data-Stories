function DataLeadText(props) {
  return (
    <>
      <h3 className="text-light" style={{ marginTop: 25, marginBottom: 25 }}>
        {props.title}
      </h3>
      <p
        className="text-light"
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {props.text}
      </p>
    </>
  );
}

export default DataLeadText;
