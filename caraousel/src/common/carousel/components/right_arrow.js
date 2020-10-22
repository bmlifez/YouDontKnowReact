import React, { Component } from 'react';
import './arrow.scss';

class RightArrow extends Component {
  render() {
    const{goToNextSlide}=this.props
    return(
      <div className="slider-controls right" onClick={goToNextSlide}>
        <img draggable="false" src="https://assets.airtel.in/static-assets/new-home/img/arrow.svg?v=1602752073093" alt="arrow" />
      </div>
    )
  }
}

export default RightArrow;
