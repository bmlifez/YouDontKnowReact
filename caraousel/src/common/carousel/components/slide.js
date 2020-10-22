import React, { Component } from 'react';
import './main.css';

class Slide extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    const {landingData,width,height,activeIndex} = this.props;
    return(
      <section>
      {
        landingData && landingData.map((data, index) =>{
          return (
            <div className={
              index === activeIndex ? 'active' : 'slide'}
              key={index}>
                <img src={localStorage.getItem(`${data}`)}  style={{width:`${width}`,height:`${height}`}}/>
            </div>
          )}
      )}
      </section>
    )
  }
}

export default Slide;
