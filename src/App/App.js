import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/auth';
import Profile from '../components/Profile/profile';
import Tutorials from '../components/Tutorials/tutorials';
import Podcasts from '../components/Podcasts/podcasts';
import Blogs from '../components/Blogs/blogs';
// import CommitsData from '../components/CommitsData/commitsData';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import authRequests from '../helpers/data/authRequests';
import tutorialsRequests from '../helpers/data/tutorialsRequests';
import blogsRequests from '../helpers/data/blogsRequests';
import podcastsRequests from '../helpers/data/podcastsRequest';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    blogs: [],
    githubUserName: '',
    githubAccessToken: '',
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    connection();
    tutorialsRequests.getRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('err getting tutorials', err));

    blogsRequests.getRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(error => console.error('err getting blogs', error));
    
    podcastsRequests.getRequest()
      .then((podcasts) => {
        this.setState({ podcasts });
      })
      .catch(error => console.error(error));
    
    // resourcesRequests.getRequest()
    //   .then((resources) => {
    //     this.setState({ resources });
    //   })
    //   .catch(error => console.error(error));

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (userName, accessToken) => {
    this.setState({
      authed: true,
      githubUserName: userName,
      githubAccessToken: accessToken,
    });
  }

  deleteOne = (tutorialId) => {
    tutorialsRequests.deleteTutorial(tutorialId)
      .then(() => {
        tutorialsRequests.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }


  render() {
    const { githubUserName, githubAccessToken } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({
        authed: false,
        gitHubUserName: '',
        gitHubAccessToken: '',
      });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <Profile githubUserName={githubUserName} githubAccessToken={githubAccessToken} />
        <div className="tabby">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Podcasts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Resources
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Tutorials
                  tutorials={this.state.tutorials}
                  deleteSingleTutorial={this.deleteOne}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
                <Col sm='12'>
                <Blogs
                  blogs={this.state.blogs}
                  deleteSingleBlog={this.deleteOne}
                />
                </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <Podcasts
                  podcasts={this.state.podcasts}
                  deleteSinglePodcast={this.deleteOne}
              />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <h4>And again more shit</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
    );
  }
}

export default App;
