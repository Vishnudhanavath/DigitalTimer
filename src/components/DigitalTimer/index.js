import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 25 * 60,
      isTimerRunning: false,
      timerSet: 25,
    }
    this.timerId = null
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.setState({isTimerRunning: true})
    this.timerId = setInterval(() => {
      this.setState(
        prevState => ({
          timer: prevState.timer - 1,
        }),
        () => {
          const {timer} = this.state
          if (timer === 0) {
            this.pauseTimer()
          }
        },
      )
    }, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  onResetTimer = () => {
    this.setState({isTimerRunning: false})
    clearInterval(this.timerId)
    this.setState({timer: 25 * 60, isTimerRunning: false, timerSet: 25})
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.startTimer()
    } else {
      this.pauseTimer()
    }
  }

  onIncrement = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerSet: prevState.timerSet + 1,
        timer: prevState.timer + 60,
      }))
    }
  }

  onDecrement = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerSet: prevState.timerSet - 1,
        timer: Math.max(prevState.timer - 60, 0),
      }))
    }
  }

  renderSeconds = () => {
    const {timer} = this.state
    const seconds = Math.floor(timer % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timer} = this.state
    const minutes = Math.floor(timer / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning, timerSet} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    const pauseOrStartImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const alternate = isTimerRunning ? 'pause icon' : 'play icon'
    const pauseOrStartText = isTimerRunning ? 'Pause' : 'Start'
    const pausedOrRunning = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bgContainer">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="timer-container">
          <div className="timer-bg">
            <div className="container">
              <div className="timer">
                <h1>{time}</h1>
                <p>{pausedOrRunning}</p>
              </div>
            </div>
          </div>
          <div className="setting-container">
            <div className="setting-card">
              <img
                src={pauseOrStartImg}
                alt={alternate}
                className="image-button"
              />
              <button
                type="button"
                className="button"
                onClick={this.onStartOrPauseTimer}
              >
                <p className="buttonHeading">{pauseOrStartText} </p>
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="image-button"
              />
              <button
                type="button"
                className="button"
                onClick={this.onResetTimer}
              >
                <p>Reset</p>
              </button>
            </div>
            <div>
              <p>Set Timer limit</p>
              <div className="time-limit">
                <button
                  type="button"
                  className="button time-set-button"
                  onClick={this.onDecrement}
                  disabled={isTimerRunning}
                >
                  -
                </button>
                <div>
                  <p className="timer-set"> {timerSet}</p>
                </div>
                <button
                  type="button"
                  className="button time-set-button"
                  onClick={this.onIncrement}
                  disabled={isTimerRunning}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
