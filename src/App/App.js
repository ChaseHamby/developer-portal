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
import Resources from '../components/Resources/resources';
import TutorialForm from '../components/TutorialForm/tutorialForm';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import authRequests from '../helpers/data/authRequests';
import tutorialsRequests from '../helpers/data/tutorialsRequests';
import blogsRequests from '../helpers/data/blogsRequests';
import podcastsRequests from '../helpers/data/podcastsRequest';
import resourcesRequests from '../helpers/data/resourcesRequests';

class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    blogs: [],
    podcasts: [],
    resources: [],
    isEditing: false,
    editId: '-1',
    selectedTutorialId: '-1',
    githubUserName: '',
    githubAccessToken: '',
  }

  tutorialSelectEvent = (id) => {
    this.setState({
      selectedTutorialId: id,
    });
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
    
    resourcesRequests.getRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(error => console.error(error));

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

  formSubmitTutorial = (newTutorial) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      tutorialsRequests.putRequest(editId, newTutorial)
        .then(() => {
          tutorialsRequests.getRequest()
            .then((tutorials) => {
              this.setState({ tutorials, isEditing: false, editId: '-1'});
            })
        })
        .catch(err => console.error('error with tutorials post', err));
    } else {
      tutorialsRequests.postTutorial(newTutorial)
        .then(() => {
          tutorialsRequests.getRequest()
            .then((tutorials) => {
              this.setStat({ tutorials });
            });
        })
        .catch(err => console.error('error adding tutorial', err));
    }
  }

  passTutorialToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });

  deleteOne = (tutorialId) => {
    tutorialsRequests.deleteTutorial(tutorialId)
      .then(() => {
        tutorialsRequests.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  };

  deleteTwo = (blogId) => {
    blogsRequests.deleteBlog(blogId)
      .then(() => {
        blogsRequests.getRequest()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  deleteThree = (podcastId) => {
    podcastsRequests.deletePodcast(podcastId)
      .then(() => {
        podcastsRequests.getRequest()
          .then((podcasts) => {
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  deleteFour = (resourceId) => {
    resourcesRequests.deleteResource(resourceId)
      .then(() => {
        resourcesRequests.getRequest()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const { 
      githubUserName,
      githubAccessToken,
      authed,
      tutorials,
      isEditing,
      editId,
      selectedTutorialId,
    } = this.state;

    // const selectedTutorial = tutorials.find(tutorial => tutorial.id === selectedTutorialId) || { nope: 'nope' };

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
        <TutorialForm
          onSubmit={this.formSubmitEvent}
          isEditing={isEditing}
          editId={editId}
        />
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
                  // tutorial={selectedTutorial}
                  deleteSingleTutorial={this.deleteOne}
                  passTutorialToEdit={this.passTutorialToEdit}
                  onTutorialSelect={this.tutorialSelectEvent}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
                <Col sm='12'>
                <Blogs
                  blogs={this.state.blogs}
                  deleteSingleBlog={this.deleteTwo}
                />
                </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <Podcasts
                  podcasts={this.state.podcasts}
                  deleteSinglePodcast={this.deleteThree}
              />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
              <Resources
                  resources={this.state.resources}
                  deleteSingleResource={this.deleteFour}
              />
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
