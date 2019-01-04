
import React from 'react';
import './profile.scss';

class Profile extends React.Component {
  render() {
    const { profile, commitCount } = this.props;

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
          {/* <h6> 12 Commits</h6>
          <p>In the last 5 days</p> */}
          <h4>{commitCount}</h4>
        </div>
        </div>
      </div>
    );
  }
}

export default Profile;
