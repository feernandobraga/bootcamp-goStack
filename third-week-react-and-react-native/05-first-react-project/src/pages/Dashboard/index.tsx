import React, { useState, FormEvent } from "react";

// import for icons
import { FiChevronRight } from "react-icons/fi";

// importing the api
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

/**
 * We create the interface to handle/store the response from the API. We only map the properties that we will need
 */
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  // we can create a useState to store data from an input
  const [newRepo, setNewRepo] = useState("");

  // useState to store data that is fetched from api
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // we use event: FormEvent<HTMLFormElement> to prevent the form to reload the page
  // along with the method preventDefault()
  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // call the api and passes the value from the input field
    const response = await api.get<Repository>(`repos/${newRepo}`);

    // get the response from the api
    const repository = response.data;

    // set the list of repositories with the new repository
    setRepositories([...repositories, repository]);

    // clear the input after the buttons is pressed
    setNewRepo("");
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Github repositories.</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          placeholder="Enter a repository name"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        {/* looping through the state to display the repositories */}
        {repositories.map((repository) => (
          <a key={repository.full_name} href="test">
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
