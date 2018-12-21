import React from 'react';
import PropTypes from 'prop-types';
import blogShape from '../../helpers/propz/blogShape';
import BlogItem from '../BlogItem/blogItem';
import './blogs.scss';

class Blogs extends React.Component {
  static propTypes = {
    blogs: PropTypes.arrayOf(blogShape),
    deleteSingleBlog: PropTypes.func,
  }

  render() {
    const { blogs, deleteSingleBlog } = this.props;
    let blogsItemComponents = '';
    if (blogs) {
      blogsItemComponents = blogs.map(blog => (
      <BlogItem
        blog={blog}
        key={blog.id}
        deleteSingleBlog={deleteSingleBlog}
      />
      ));
    }
    return (
      <div className="Blogs">
        <h2>Blogs</h2>
        <ul>{blogsItemComponents}</ul>
      </div>
    );
  }
}

export default Blogs;
