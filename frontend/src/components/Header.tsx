function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid justify-content-center">
          <div className="input-group w-50">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#404040", border: "none" }}
            >
              <i className="bi bi-search" style={{ color: "white" }}></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for topics"
              style={{ backgroundColor: "#404040", border: "none" }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
