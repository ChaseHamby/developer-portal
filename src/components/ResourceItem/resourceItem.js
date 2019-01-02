import React from 'react';
import PropTypes from 'prop-types';
import resourceShape from '../../helpers/propz/resourceShape';
import authRequests from '../../helpers/data/authRequests';
import './resourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: resourceShape,
    deleteSingleResource: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, resource } = this.props;
    deleteSingleResource(resource.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, resource } = this.props;
    passListingToEdit(resource.id);
  }

  resourceClick = (e) => {
    e.stopPropagation();
    const { resource, onSelect } = this.props;
    onSelect(resource.id);
  }

  render() {
    const { resource } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (resource.uid === uid) {
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
      <li className="resource-item text-center" onClick={this.resourceClick}>
      <span className="col">{resource.name}</span>
      <span className="col-3"><a href={resource.url}>Link</a></span>
      {makeButtons()}
    </li>
    );
  }
}

export default ResourceItem;
