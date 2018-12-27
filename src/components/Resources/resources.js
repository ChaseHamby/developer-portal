import React from 'react';
import PropTypes from 'prop-types';
import resourceShape from '../../helpers/propz/resourceShape';
import ResourceItem from '../ResourceItem/resourceItem';
import './resources.scss';

class Resources extends React.Component {
  static propTypes = {
    resources: PropTypes.arrayOf(resourceShape),
    deleteSingleResource: PropTypes.func,
  }

  render() {
    const { resources, deleteSingleResource } = this.props;
    let resourcesItemComponents = '';
    if (resources) {
      resourcesItemComponents = resources.map(resource => (
      <ResourceItem
      resource={resource}
        key={resource.id}
        deleteSingleResource={deleteSingleResource}
      />
      ));
    }
    return (
      <div className="Resources">
        <h2>Resources</h2>
        <ul>{resourcesItemComponents}</ul>
      </div>
    );
  }
}

export default Resources;
