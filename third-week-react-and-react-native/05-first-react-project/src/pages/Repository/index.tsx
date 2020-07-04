import React, { useEffect, useState } from "react";

// to retrieve params from the url
import { useRouteMatch, Link } from "react-router-dom";

// importing the logo to be used as image
import logoImg from "../../assets/logo.svg";

// importing the icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// import the api
import api from "../../services/api";

// importing styled components
import { Header, RepositoryInfo, Issues } from "./styles";

// interface that handles the params sent through the routes
interface RepositoryParams {
  repository: string;
}

/**
 * We create the interface to handle/store the response from the API. We only map the properties that we will need and assign to the useState()
 */
interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// interface to store the issue
interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  // retrieving params from the route
  const { params } = useRouteMatch<RepositoryParams>();

  // state to store the repositories, the can be either null or a repository as per the interface
  const [repository, setRepository] = useState<Repository | null>(null);

  // state to store the issues
  const [issues, setIssues] = useState<Issue[]>([]);

  // we will execute two api calls in the same useEffect and
  // we need to include the param.repository in the hooks area, because it the param changes, we may need to call an api for a different params
  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={20} /> Back
        </Link>
      </Header>

      {/* if repository exists */}
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Open Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
