import React, { useState, FormEvent, useEffect } from "react";

// import for icons
import { FiChevronRight } from "react-icons/fi";

// importing the api
import api from "../../services/api";

// importing the logo to be used as image
import logoImg from "../../assets/logo.svg";

// import for styled components
import { Title, Form, Repositories, Error } from "./styles";

// import to navigate between pages
import { Link } from "react-router-dom";

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

  // useState to store data that is fetched from api.
  // instead of passing an empty array, we pass an arrow function that retrieves the information from local storage
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem("@GithubExplorer:repositories");

    // since we stored it using JSON.stringify, we need to revert it back using JSON.parse
    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    } else {
      return [];
    }
  });

  // state to store and update user error
  const [inputError, setInputError] = useState("");

  // use effect to call the storage whenever the variable repositories change
  // The method localStorage.setItem() does not take an array, so we need to convert it to a string using JSON.stringify()
  useEffect(() => {
    localStorage.setItem("@GithubExplorer:repositories", JSON.stringify(repositories));
  }, [repositories]);

  // we use event: FormEvent<HTMLFormElement> to prevent the form to reload the page
  // along with the method preventDefault()
  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //check if the user actually entered a repository
    if (!newRepo) {
      setInputError("You must enter a author/repository first");
      return;
    }

    try {
      // call the api and passes the value from the input field
      const response = await api.get<Repository>(`repos/${newRepo}`);

      // get the response from the api
      const repository = response.data;

      // set the list of repositories with the new repository
      setRepositories([...repositories, repository]);

      // clear the input after the buttons is pressed
      setNewRepo("");
      // clear any previous error messages
      setInputError("");
    } catch (err) {
      setInputError("Could not find a match for author/repository");
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Github repositories.</Title>

      {/* the double !! converts the string to a boolean value. True if the variable has a content, otherwise false */}
      {/* therefore, if inputError HAS an error, the variable is true and we need to apply the custom styling */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Enter a repository name"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      {/* only display the element error, if inputError has a value */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {/* looping through the state to display the repositories */}
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
