import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import authRequests from '../../helpers/data/authRequests';
// import tutorialsRequests from '../../helpers/data/tutorialsRequests';

const defaultListing = {
  name: '',
  url: '',
  uid: '',
};

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newListing: defaultListing,
    selectedOption: 'tutorial',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newListing };
    tempListing[name] = e.target.value;
    this.setState({ newListing: tempListing });
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  }

  nameChange = e => this.formFieldStringState('name', e);

  urlChange = e => this.formFieldStringState('url', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myForm = { ...this.state.newListing };
    const myDist = this.state.selectedOption;
    myForm.uid = authRequests.getCurrentUid();
    onSubmit(myForm, myDist);
    this.setState({ newListing: defaultListing });
  }

  // componentDidUpdate(prevProps) {
  //   const { isEditing, editId } = this.props;
  //   if (prevProps !== this.props && isEditing) {
  //     tutorialsRequests.getSingleTutorial(editId)
  //       .then((tutorial) => {
  //         this.setState({ newTutorial: tutorial.data });
  //       })
  //       .catch(err => console.error('error with getSingleTutorial', err));
  //   }
  // }

  render() {
    const { newListing } = this.state;
    return (
      <div className="form col">
      <form onSubmit={this.formSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Intro to Tutorial"
            value={newListing.name}
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
            value={newListing.url}
            onChange={this.urlChange}
          />
        <div className="radio">
        <label>
          <input type="radio" value="tutorials"
            checked={this.state.selectedOption === 'tutorials'}
            onChange={this.handleOptionChange} />
            Tutorials
        </label>
        </div>
        <div className="radio">
        <label>
          <input type="radio" value="blogs"
            checked={this.state.selectedOption === 'blogs'}
            onChange={this.handleOptionChange} />
            Blogs
        </label>
        </div>
        <div className="radio">
        <label>
          <input type="radio" value="podcasts"
            checked={this.state.selectedOption === 'podcasts'}
            onChange={this.handleOptionChange} />
            Podcasts
        </label>
        </div>
        <div className="radio">
        <label>
          <input type="radio" value="resources"
            checked={this.state.selectedOption === 'resources'}
            onChange={this.handleOptionChange} />
            Resources
        </label>
        </div>
        <button className="btn btn-danger">Save</button>
      </div>
    </form>
  </div>
    );
  }
}

export default Form;
