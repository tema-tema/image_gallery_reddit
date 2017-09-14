import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded } from './redux/actions';
import './styles/App.css';
import Posts from './components/posts';
import CircularProgress from 'material-ui/CircularProgress';
import CommentsFilter from './components/slider';
class App extends Component {

  constructor() {
    super()
    this.state = {
      subreddit: '',
      value: [0,700]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

    handleChange(e) {
    this.setState({subreddit: e.target.value});
  }
  
    handleOnChange(e) {
    this.setState({ num_comments: e.target.value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(selectSubreddit(this.state.subreddit))
    this.props.dispatch(fetchPostsIfNeeded(this.state.subreddit))
  }
  
  render() {
    const { posts, isFetching, didInvalidate } = this.props
    return (
      <div className="App">
        <section className="gallery-section">
          <div className="CommentsFilter">
          <CommentsFilter value={0} min={0} max={700} step={10}  onChange={this.handleOnChange}/>
        </div>
        {isFetching && !didInvalidate && posts.length === 0 &&
          <div className="loadingWrap">
            <CircularProgress size={60} thickness={7} />
          </div>
        }
        {posts.length > 0 && !didInvalidate &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    didInvalidate,
    value: num_comments,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedSubreddit,
    posts,
    num_comments,
    isFetching,
    didInvalidate,
  }
}

export default connect(mapStateToProps)(App)
