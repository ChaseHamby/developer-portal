import React from 'react';
import PropTypes from 'prop-types';
import './tutorialForm.scss';
import authRequests from '../../helpers/data/authRequests';
import tutorialsRequests from '../../helpers/data/tutorialsRequests';

const defaultTutorial = {
  name: '',
  url: '',
  uid: '',
};

class TutorialForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newTutorial: defaultTutorial,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempTutorial = { ...this.state.newTutorial };
    tempTutorial[name] = e.target.value;
    this.setState({ newTutorial: tempTutorial });
  }

  nameChange = e => this.formFieldStringState('name', e);

  urlChange = e => this.formFieldStringState('url', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myTutorial = { ...this.state.newTutorial };
    myTutorial.uid = authRequests.getCurrentUid();
    onSubmit(myTutorial);
    this.setState({ newTutorial: defaultTutorial });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      tutorialsRequests.getSingleTutorial(editId)
        .then((tutorial) => {
          this.setState({ newTutorial: tutorial.data });
        })
        .catch(err => console.error('error with getSingleTutorial', err));
    }
  }

  render() {
    const { newTutorial } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Tutorial: </h2>;
      }
      return <h2>Add New Tutorial: </h2>;
    };
    return (
      <div className="tutorial-form col">
      {title()}
      <form onSubmit={this.formSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Intro to Tutorial"
            value={newTutorial.name}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL: </label>
          <input
            type="text"
            className="form-control"
            id="url"
            aria-describedby="urlHelp"
            placeholder="www.google.com"
            value={newTutorial.url}
            onChange={this.urlChange}
          />
        </div>
        <button className="btn btn-danger">Save Tutorial</button>
    </form>
  </div>
    );
  }
}

export default TutorialForm;
