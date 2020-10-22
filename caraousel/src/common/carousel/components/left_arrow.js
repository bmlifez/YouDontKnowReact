import React, { Component } from 'react';
import './arrow.scss'
class LeftArrow extends Component {
  render() {
    const {goToPrevSlide}=this.props;
    return(
      <div className="slider-controls left" onClick={goToPrevSlide}>
        <img draggable="false" src="https://assets.airtel.in/static-assets/new-home/img/arrow.svg?v=1602752073093" alt="arrow" />
      </div>
    )
  }
}

export default LeftArrow;
