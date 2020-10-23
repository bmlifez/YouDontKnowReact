import React, { Component } from 'react';
import './arrow.scss';

class RightArrow extends Component {
  render() {
    const{goToNextSlide}=this.props
    return(
      <div className="slider-controls right" onClick={goToNextSlide}>
        <img draggable="false" src={require('../resources/arrow.svg')} alt="arrow" />
      </div>
    )
  }
}

export default RightArrow;
