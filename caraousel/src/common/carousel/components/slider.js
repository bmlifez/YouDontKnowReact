import React, { Component } from 'react';
import Slide                from './slide';
import LeftArrow            from './left_arrow';
import RightArrow           from './right_arrow';
import PropTypes            from 'prop-types';
import './main.css';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  goToPrevSlide() {
    let index = this.state.activeIndex;
    let length = this.props.landingData.length;

    if (index < 1) {
      index = length - 1;
    }
    else {
      index--;
    }

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide() {
    const {length}=this.props;
    let index   =  this.state.activeIndex;

    if (index === length - 1) {
      index = 0
    }
    else {
      index++;
    }

    this.setState({
      activeIndex: index
    });
  }

  ImageClickUpdate=()=>{
    const {updateActiveIndex} = this.props;
    const {activeIndex} = this.state;
    updateActiveIndex(activeIndex);
  }

  render() {
    const { height, width ,landingData} = this.props;
    const {activeIndex} = this.state;
    return (
      <div className='slider'>
        <div className='slider-items'>
          <LeftArrow
            goToPrevSlide={() => this.goToPrevSlide()}
          />
          <div className='slider-text'>
            <Slide
              landingData={landingData}
              activeIndex={activeIndex}
              goToNextSlide={() => this.goToNextSlide()}
              width={width   || '450px'}
              height={height || '300px'}
              sliderCallback={this.ImageClickUpdate}
            />
          </div>
          <RightArrow
            goToNextSlide={() => this.goToNextSlide()}
          />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  updateActiveIndex: PropTypes.func
}