import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from 'reactstrap';
import githubRequests from '../../helpers/data/githubRequests';
import './profile.scss';

class Profile extends React.Component {
  state = {
    githubProfile: [],
  }

  static PropTypes = {
    githubUserName: '',
    githubAccessToken: '',
  };
  
  componentDidMount() {
    const { githubUserName, githubAccessToken } = this.props;
    if (githubUserName && githubAccessToken) {
      githubRequests.getUser(githubUserName, githubAccessToken)
        .then((githubProfile) => {
          this.setState({ githubProfile });
        })
        .catch(error => console.error('error getting git profile', error));
    }
  }

  render() {
    const { githubProfile } = this.state;
    return (
      <div className="Profile col-4">
        <Card>
          <CardImg
            top
            width="50%"
            src={githubProfile.avatar_url}
            alt="Card image cap"
            className="mx-auto"
          />
          <CardBody>
            <CardTitle>{githubProfile.name}</CardTitle>
            <CardText>{githubProfile.bio}</CardText>
            <CardText>
              <small className="text-muted">
                <a href={githubProfile.html_url} target="_blank" rel="noopener noreferrer">
                  {githubProfile.html_url}
                </a>
              </small>
            </CardText>
          </CardBody>
          <CardText className="h2">
            <u></u>
          </CardText>
          <CardText>Commits in the last 5 days</CardText>
        </Card>
      </div>
    );
  }
}

export default Profile;
