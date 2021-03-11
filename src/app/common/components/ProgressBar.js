import React, { useState, useEffect }  from "react";

import "../styles/progress-bar-styles.css";

function ProgressBar(props) {

    const [percentage, setPercentage] = useState(0);

    
  //  console.log("Percentage")
   // console.log(percentage)

    useEffect( 
      () => {
        setInterval(
                () => {
                  
                  setPercentage(percentage => percentage + 4);
               //   setCompleted(Math.random() * 100)
                },
              20)
          
      }, []);

    // Size of the enclosing square
    const sqSize = props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (props.sqSize - props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * (percentage + props.phase)) / 100;

  return (
    <svg
        width={props.sqSize}
        height={props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
        />

        <circle
          className="circle-progress"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${props.sqSize / 2} ${
            props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
  );
}

export default ProgressBar;

/*

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)

 //  this.incrementPercentage = this.incrementPercentage.bind(this)
    
    this.state = {
      percentage: 0 
    }

  }

  workerEventListener = e => {
    this.setState(function (state, props) {
      return {
        ...state,
        percentage : (state.percentage + 2)
      }
    })
  }



  componentDidMount() {

  //  this.props.mathState.innerWorker.addEventListener('message', this.workerEventListener)
 /*   this.props.mathState.innerWorker.postMessage({
      delay: 10
    });*/
    /*
  }
 
  componentWillUnmount() {
  //  this.props.mathState.innerWorker.removeEventListener('message', this.workerEventListener)
  }
  

  

  

  render() {


    const [percentage, setCompleted] = useState(0);

    useEffect(() => {
      setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
    }, []);

    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * (percentage + this.props.phase)) / 100;

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />

        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${
            this.props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
    );
  }
}

/***    <text
              className="circle-text"
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle">
              {`${this.props.percentage}%`}
            </text> */
/*

export default ProgressBar;
*/