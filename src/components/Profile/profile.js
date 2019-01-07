
import React from 'react';
import './profile.scss';

class Profile extends React.Component {
  render() {
    const { profile, commitCount, isAuthed } = this.props;

    if (isAuthed) {
      return (
      <div className="profile col">
        <div className="profileWrap">
        <div className="card">
          <img className="img-fluid" src={profile.avatar_url} alt="github pic"></img>
          <p className="card-text">{profile.bio}</p>
          <h2 className="card-title">{profile.login}</h2>
          <a href={profile.html_url} className="_blank">https://github.com/ChaseHamby</a>
          <br/>
          <br/>
          <h4>{commitCount}</h4>
          <p>Commits in the last 5 days</p>
        </div>
        </div>
      </div>
      );
    }
  }
}

export default Profile;
