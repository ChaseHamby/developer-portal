import React from 'react';
import PropTypes from 'prop-types';
import blogShape from '../../helpers/propz/blogShape';
import authRequests from '../../helpers/data/authRequests';
import './blogItem.scss';

class BlogItem extends React.Component {
  static propTypes = {
    blog: blogShape,
    deleteSingleBlog: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBlog, blog } = this.props;
    deleteSingleBlog(blog.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passListingToEditBlog, blog } = this.props;
    passListingToEditBlog(blog.id);
  }

  blogClick = (e) => {
    e.stopPropagation();
    const { blog, onSelect } = this.props;
    onSelect(blog.id);
  }

  render() {
    const { blog } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (blog.uid === uid) {
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
      <li className="blog-item text-center" onClick={this.blogClick}>
      <span className="col">{blog.name}</span>
      <span className="col-3"><a href={blog.url}>Link</a></span>
      {makeButtons()}
    </li>
    );
  }
}

export default BlogItem;
