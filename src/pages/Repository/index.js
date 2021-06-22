import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Loading, Owner, IssueList } from './styles';
import Container from '../../components/Container';

class Repository extends Component {
  // Define the props that will be recieved by this component
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    // Take the passed url arguments
    const { match } = this.props;
    const repositoryName = decodeURIComponent(match.params.repository);

    // Send booth of the requests at the same time
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { loading, repository, issues } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }
    return (
      <>
        <Container>
          <Owner>
            <Link to="/">Back to the repositories</Link>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {
              // It is recommended to define the key for each element as a string!
              // The div is to encapsulate multiple items for the flexbox
              issues.map((issue) => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {
                        /** LABELS */
                        issue.labels.map((label) => (
                          <span key={String(label.id)}>{label.name}</span>
                        ))
                      }
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))
            }
          </IssueList>
        </Container>
      </>
    );
  }
}

export default Repository;
