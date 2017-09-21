import {combineReducers} from 'redux';

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SORT_POSTS,
  FILTER_POSTS
} from './actions';

const has = p => o => o.hasOwnProperty(p);
const sortBy = p => (a, b) => a[p] > b[p];


export const selectedSubreddit = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

export const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    case FILTER_POSTS:
          return posts.filter(has('num_comments'));
       default:
          return state;
  }
};

export const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
