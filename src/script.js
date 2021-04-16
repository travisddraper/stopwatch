class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassedInMilliSeconds: 0
    }

    this.timer = null;
    //SET AS A PROPERTY OF THE CLASS OBJECT RATHER THAN A COMPONENT STATE PROPERTY bc of how React handles updating the state with this.setState(). When we call this method, React puts the state update in a queue and updates at a later time, THE STATE IS UPDATED ASYNCHRONOUSLY and so we can't be sure when it will happen. So we can't store it there for such a time-sensitive purpose.

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    // Since we will be calling the time in the window object, it is necessary to first bind the THIS variable of these methods to this class component, in order to access the state component property
  }
  //the constructor method will initiate the componnet state with the above property, which is where we will store the running time of the stopwatch.

  start() {
    if(!this.timer) {
      //An if clause added to ensure multiple intervals don't run in tandem, this is why we defined this.timer earlier as null and redefine it as such in the Stop method (within the start method we then pass it the interval ID)

      let startTime = Date.now();
      //sets the initial startTime, which will then be updated with the stopTime within the interval function

      this.timer = setInterval(() => {
        //store the interval ID in this.timer so we can use the stop method to stop the interval

        const stopTime = Date.now();
        //redefines the stopTime every 250ms
        //returns a value in ms of time passed since Jan 1st, 1970

        const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;
        //Theoretically adds 250ms to value of this.state.timePassedInMilliSeconds every 250ms (but leaves room for interval inconsistency by adding whatever the difference in times is)

        this.setState({
          timePassedInMilliSeconds,
          //passes the new cumulative value of time passed to the state property
        });

        startTime = stopTime;
        //tracks the most recent stop time as the new start time for the following interval calculation
      }, 250)
    }
  }

  stop() {
    window.clearInterval(this.timer);
    //clears the start method interval

    this.timer = null;
    //sets this.timer to null so that the start method can run again when fired
  }

  reset() {
    this.stop();
    //first stops

    this.setState({
      timePassedInMilliSeconds: 0
    })
    //and then resets the value of the component state property
  }

  render() {
    return (
      //the content of the h2 element is the ms time of our state variable converted into seconds
      <div>
        <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "300px"}}>
          {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
        </h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mr-2" onClick={this.start}>
            start
          </button>
          <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
            stop
          </button>
          <button className="btn btn-outline-warning" onClick={this.reset}>
            reset
          </button>
        </div>
      </div>
      
    )
    
  }
}
ReactDOM.render(
  <StopWatch />,
  document.getElementById('root')
);
