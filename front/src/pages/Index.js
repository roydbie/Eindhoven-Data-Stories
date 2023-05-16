import Topics from "../components/Topics";
import DataLead from "../components/DataLead";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

function Index() {
  const DataLeads = [
    {
      title: "Income & health",
      topics: ["management"],
      icons: [
        "bi bi-lungs",
        "bi bi-hospital",
        "bi bi-emoji-laughing",
        "bi bi-piggy-bank",
      ],
      url: "incomevs",
      image:
        "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Public reports",
      topics: ["nature and environment"],
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
      topics: ["culture and recreation"],
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
      topics: ["housing"],
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

  const [topics, updateTopics] = useState([
    "nature and environment",
    "infrastructure",
    "management",
    "culture and recreation",
    "traffic",
    "housing",
  ]);

  const filteredDataLeads = DataLeads.filter((element) => {
    if (topics.some((r) => element.topics.indexOf(r) >= 0)) {
      return element;
    } else {
      return null;
    }
  });

  function TopicChange(topics) {
    updateTopics(topics);
  }

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);
  const prompt = "The neighbourhood ";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      console.log(result.data.choices[0].text);
      //setApiResponse(result.data.choices[0].text);
    } catch (e) {
      console.log(e);
      //setApiResponse("Something is going wrong, Please try again.");
    }
  };

  return (
    <>
      <div className="w-100" style={{ height: 50 }}>
        &nbsp;
      </div>
      <div className="row">
        <div className="col-3 ps-3">
          <Topics topicSelected={TopicChange}></Topics>
        </div>
        <div className="col">
          <h1 className="text-light ms-5">Data Leads</h1>
          <div className="container-fluid">
            {filteredDataLeads.length > 0 &&
              filteredDataLeads.map((element) => (
                <DataLead
                  key={element.title}
                  title={element.title}
                  icons={element.icons}
                  url={element.url}
                  image={element.image}
                ></DataLead>
              ))}
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            OpenAI
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
