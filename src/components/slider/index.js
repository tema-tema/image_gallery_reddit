import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import Posts from '../posts'

import { buildSelector } from 'redux-filter';

//const selector = buildSelector(state => state.filters);
// const filterState = selector(store.getState());

class CommentsSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      num_comments: 0
    }
  }
 
  handleOnChange = (num_comments) => {
    this.setState({
      value: num_comments
    })
  }
 
  render() {
    let { num_comments } = this.state
    return (
      <Slider
        value={0}
        orientation="horizontal"
        onChange={this.handleOnChange}
      />
    )
  }
}

export default CommentsSlider;