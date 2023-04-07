import Topics from "../components/Topics";
import DataLead from "../components/DataLead";

function Index() {
  const DataLeads = [
    {
      title: "Neighbourhoods",
      icons: [
        "bi bi-building",
        "bi bi-signpost-split",
        "bi bi-cart4",
        "bi bi-mortarboard",
      ],
      url: "neighbourhoods",
      image:
        "https://images.pexels.com/photos/6039193/pexels-photo-6039193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Public reports",
      icons: [
        "bi bi-flower1",
        "bi bi-house",
        "bi bi-people-fill",
        "bi bi-trash3",
      ],
      url: "publicreports",
      image:
        "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Playgrounds",
      icons: [
        "bi bi-geo",
        "bi bi-people-fill",
        "bi bi-dribbble",
        "bi bi-emoji-smile",
      ],
      url: "playgrounds",
      image:
        "https://images.pexels.com/photos/4430308/pexels-photo-4430308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Property value",
      icons: [
        "bi bi-houses",
        "bi bi-currency-exchange",
        "bi bi-tree",
        "bi bi-building",
      ],
      url: "propertyvalue",
      image:
        "https://images.pexels.com/photos/3935316/pexels-photo-3935316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div className="row">
      <div className="col-3 ps-3">
        <Topics></Topics>
      </div>
      <div className="col">
        <h1 className="text-light ms-5">Data Leads</h1>
        <div className="container-fluid">
          {DataLeads.length > 0 &&
            DataLeads.map((element) => (
              <DataLead
                key={element.title}
                title={element.title}
                icons={element.icons}
                url={element.url}
                image={element.image}
              ></DataLead>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
