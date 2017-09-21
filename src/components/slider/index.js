import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const CommentsFilter = ({value, max, min, onChange}) => {
  return (
    <Slider
      value={value}
      min={min} max={max} step={1}
      orientation="horizontal"
      onChange={onChange}
    />
  );
};

export default CommentsFilter;
