import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class CommentsFilter extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      num_comments: 0
    }
  }
 
  handleOnChange = (value) => {
    this.setState({
      num_comments: value
    })
  }
 
  render() {
    let { num_comments } = this.state
    return (
      <Slider
        value={ num_comments }
        min={0} max={700} step={10}
        orientation="horizontal"
        onChange={this.handleOnChange}
      />
    )
  }
}

export default CommentsFilter;