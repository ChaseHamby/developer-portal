import React from 'react';
import PropTypes from 'prop-types';
import podcastShape from '../../helpers/propz/podcastShape';
import authRequests from '../../helpers/data/authRequests';
import './podcastItem.scss';

class PodcastItem extends React.Component {
  static propTypes = {
    podcast: podcastShape,
    deleteSinglePodcast: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePodcast, podcast } = this.props;
    deleteSinglePodcast(podcast.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEdit, podcast } = this.props;
    passListingToEdit(podcast.id);
  }

  podcastClick = (e) => {
    e.stopPropagation();
    const { podcast, onSelect } = this.props;
    onSelect(podcast.id);
  }

  render() {
    const { podcast } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (podcast.uid === uid) {
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
      <li className="podcast-item text-center" onClick={this.podcastClick}>
      <span className="col">{podcast.name}</span>
      <span className="col-3"><a href={podcast.url}>Link</a></span>
      {makeButtons()}
    </li>
    );
  }
}

export default PodcastItem;
