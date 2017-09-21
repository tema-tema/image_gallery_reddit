import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSubreddit, fetchPostsIfNeeded } from "./redux/actions";
import "./styles/App.css";
import Posts from "./components/posts";
import CircularProgress from "material-ui/CircularProgress";
import CommentsFilter from "./components/slider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddit: '',
      posts: [],
      filteredPosts: [],
      minComments: 0,
      maxComments: 0,
      currentFilter: 0,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    const posts = nextProps.posts;
    if (posts.length) {
      const minComments = posts[0]["num_comments"];
      const maxComments = posts[posts.length - 1]["num_comments"];
      this.setState({
        filteredPosts: posts,
        posts,
        minComments,
        maxComments,
        currentFilter: minComments
      });
    }
  }

  handleSliderChange(num) {
    const currentFilter = num;
    const filteredPosts = this.state.posts.filter(post => post.num_comments > num);
    this.setState({filteredPosts, currentFilter})
  }

  render() {
    console.log(this.state);
    const { isFetching, didInvalidate } = this.props;
    const { filteredPosts, minComments, maxComments, currentFilter } = this.state;
    return (
      <div className="App">
        <section className="gallery-section">
          <div className='slider-wrapper'>
            <div>
              { minComments}
            </div>
            <div className="CommentsFilter">
              <CommentsFilter value={currentFilter} min={minComments} max={maxComments} onChange={this.handleSliderChange} />
            </div>
            <div>
              { maxComments }
            </div>
          </div>
          <div className='current-filter'>
              {`Current filter: ${currentFilter}`}
          </div>
          {isFetching &&
          !didInvalidate &&
          filteredPosts.length === 0 && (
            <div className="loadingWrap">
              <CircularProgress size={60} thickness={7} />
            </div>
          )}
          {filteredPosts.length > 0 &&
          !didInvalidate && (
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={filteredPosts} />
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    didInvalidate,
    value: num_comments,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };
  return {
    selectedSubreddit,
    posts,
    num_comments,
    isFetching,
    didInvalidate
  };
};

export default connect(mapStateToProps)(App);
