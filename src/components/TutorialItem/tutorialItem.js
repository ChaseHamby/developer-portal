import React from 'react';
import PropTypes from 'prop-types';
import tutorialShape from '../../helpers/propz/tutorialShape';
import authRequests from '../../helpers/data/authRequests';
import './tutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: tutorialShape,
    deleteSingleTutorial: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTutorial, tutorial } = this.props;
    deleteSingleTutorial(tutorial.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, tutorial } = this.props;
    passListingToEdit(tutorial.id);
  }

  tutorialClick = (e) => {
    e.stopPropagation();
    const { tutorial, onSelect } = this.props;
    onSelect(tutorial.id);
  }

  render() {
    const { tutorial } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (tutorial.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="tutorial-item text-center" onClick={this.tutorialClick}>
      <span className="col">{tutorial.name}</span>
      <span className="col-3"><a href={tutorial.url}>Link</a></span>
      {makeButtons()}
    </li>
    );
  }
}

export default TutorialItem;
