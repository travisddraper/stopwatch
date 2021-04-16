var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
  _inherits(StopWatch, _React$Component);

  function StopWatch(props) {
    _classCallCheck(this, StopWatch);

    var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

    _this.state = {
      timePassedInMilliSeconds: 0
    };

    _this.timer = null;
    //SET AS A PROPERTY OF THE CLASS OBJECT RATHER THAN A COMPONENT STATE PROPERTY bc of how React handles updating the state with this.setState(). When we call this method, React puts the state update in a queue and updates at a later time, THE STATE IS UPDATED ASYNCHRONOUSLY and so we can't be sure when it will happen. So we can't store it there for such a time-sensitive purpose.

    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.reset = _this.reset.bind(_this);
    // Since we will be calling the time in the window object, it is necessary to first bind the THIS variable of these methods to this class component, in order to access the state component property
    return _this;
  }
  //the constructor method will initiate the componnet state with the above property, which is where we will store the running time of the stopwatch.

  _createClass(StopWatch, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.timer) {
        //An if clause added to ensure multiple intervals don't run in tandem, this is why we defined this.timer earlier as null and redefine it as such in the Stop method (within the start method we then pass it the interval ID)

        var startTime = Date.now();
        //sets the initial startTime, which will then be updated with the stopTime within the interval function

        this.timer = setInterval(function () {
          //store the interval ID in this.timer so we can use the stop method to stop the interval

          var stopTime = Date.now();
          //redefines the stopTime every 250ms
          //returns a value in ms of time passed since Jan 1st, 1970

          var timePassedInMilliSeconds = stopTime - startTime + _this2.state.timePassedInMilliSeconds;
          //Theoretically adds 250ms to value of this.state.timePassedInMilliSeconds every 250ms (but leaves room for interval inconsistency by adding whatever the difference in times is)

          _this2.setState({
            timePassedInMilliSeconds: timePassedInMilliSeconds
            //passes the new cumulative value of time passed to the state property
          });

          startTime = stopTime;
          //tracks the most recent stop time as the new start time for the following interval calculation
        }, 250);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      window.clearInterval(this.timer);
      //clears the start method interval

      this.timer = null;
      //sets this.timer to null so that the start method can run again when fired
    }
  }, {
    key: "reset",
    value: function reset() {
      this.stop();
      //first stops

      this.setState({
        timePassedInMilliSeconds: 0
      });
      //and then resets the value of the component state property
    }
  }, {
    key: "render",
    value: function render() {
      return (
        //the content of the h2 element is the ms time of our state variable converted into seconds
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { className: "border px-3 py-4 rounded my-3 mx-auto text-center", style: { maxWidth: "300px" } },
            Math.floor(this.state.timePassedInMilliSeconds / 1000),
            " s"
          ),
          React.createElement(
            "div",
            { className: "d-flex justify-content-center" },
            React.createElement(
              "button",
              { className: "btn btn-outline-primary mr-2", onClick: this.start },
              "start"
            ),
            React.createElement(
              "button",
              { className: "btn btn-outline-danger mr-2", onClick: this.stop },
              "stop"
            ),
            React.createElement(
              "button",
              { className: "btn btn-outline-warning", onClick: this.reset },
              "reset"
            )
          )
        )
      );
    }
  }]);

  return StopWatch;
}(React.Component);

ReactDOM.render(React.createElement(StopWatch, null), document.getElementById('root'));