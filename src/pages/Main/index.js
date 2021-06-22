import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';

import 'react-toastify/dist/ReactToastify.css';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Responsable to fetch the repositories saved inside the localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Responsable to save the repositories inside the localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleNewRepoChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // Take the necessaries variables out of the state, that will be used inside
    // this block of code
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });
    try {
      const response = await api.get(`/repos/${newRepo}`);

      const repoData = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, repoData],
        newRepo: '',
        loading: false,
      });
    } catch (exception) {
      toast.error('No repository was found');
      this.setState({
        newRepo: '',
        loading: false,
      });
    }
  };

  handleRepositoryDelete = (repositoryName) => {
    const { repositories } = this.state;

    const newRepositories = repositories.filter(
      (repository) => repository.name !== repositoryName
    );

    this.setState({
      repositories: newRepositories,
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;
    return (
      <Container>
        <ToastContainer />
        <h1>
          <FaGithubAlt color="#000" />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add a repository"
            value={newRepo}
            onChange={this.handleNewRepoChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories &&
            repositories.map((repository) => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <div>
                  <Link
                    to={`/repository/${encodeURIComponent(repository.name)}`}
                  >
                    Repository details
                  </Link>

                  <button
                    type="button"
                    onClick={() => this.handleRepositoryDelete(repository.name)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
        </List>
      </Container>
    );
  }
}

export default Main;

/*
  Tip: If the element has more than 2 levels of tags, you create a new styled
  component for it;
  Another tip: If you neeed to style a component dependent of a state of the page
  or of some aspects, you declare a styled component
*/
