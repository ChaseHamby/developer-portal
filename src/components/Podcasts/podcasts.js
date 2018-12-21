import React from 'react';
import PropTypes from 'prop-types';
import podcastShape from '../../helpers/propz/podcastShape';
import PodcastItem from '../PodcastItem/podcastItem';
import './podcasts.scss';

class Podcasts extends React.Component {
  static propTypes = {
    podcasts: PropTypes.arrayOf(podcastShape),
    deleteSinglePodcast: PropTypes.func,
  }

  render() {
    const { podcasts, deleteSinglePodcast } = this.props;
    let podcastsItemComponents = '';
    if (podcasts) {
      podcastsItemComponents = podcasts.map(podcast => (
      <PodcastItem
        podcast={podcast}
        key={podcast.id}
        deleteSinglePodcast={deleteSinglePodcast}
      />
      ));
    }
    return (
      <div className="Podcasts">
        <h2>Podcasts</h2>
        <ul>{podcastsItemComponents}</ul>
      </div>
    );
  }
}

export default Podcasts;
