import React from 'react';
import PropTypes from 'prop-types';
import tutorialShape from '../../helpers/propz/tutorialShape';
import TutorialItem from '../TutorialItem/tutorialItem';
import './tutorials.scss';

class Tutorials extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(tutorialShape),
    deleteSingleTutorial: PropTypes.func,
  }

  render() {
    const { tutorials, deleteSingleTutorial } = this.props;
    let tutorialsItemComponents = '';
    if (tutorials) {
      tutorialsItemComponents = tutorials.map(tutorial => (
      <TutorialItem
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleTutorial={deleteSingleTutorial}
      />
      ));
    }
    return (
      <div className="Tutorials">
        <h2>Tutorials</h2>
        <ul>{tutorialsItemComponents}</ul>
      </div>
    );
  }
}

export default Tutorials;
