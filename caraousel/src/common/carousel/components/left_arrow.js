import React, { Component } from 'react';
import './arrow.scss'
class LeftArrow extends Component {
  render() {
    const {goToPrevSlide}=this.props;
    return(
      <div className="slider-controls left" onClick={goToPrevSlide}>
        <img draggable="false" src={require('../resources/arrow.svg')} alt="arrow" />
      </div>
    )
  }
}

export default LeftArrow;
