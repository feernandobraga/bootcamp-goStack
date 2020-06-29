import React, { useState, useEffect } from "react";

import "./App.css";
import backgroundImage from "./assets/background.jpeg";

import Header from "./components/Header";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  // hits the api when the component loads and executes a get request
  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // add a project BEFORE we implemented the API
    // setProjects([...projects, `New Project ${Date.now()}`]);

    //stores the reply from the server when we post something to it in the response variable
    const response = await api.post("projects", {
      title: "hard coded title",
      owner: "hard coded owner",
    });

    // we save the API response into a new project variable and then by using the spread operator
    // we add the project to the local array, instead of calling the API every time we add something on it
    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="bazinga!!" />

      <img width={300} src={backgroundImage} />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Add project
      </button>
    </>
  );
}

export default App;
