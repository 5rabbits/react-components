import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeInput from '../dist/time-input'

export default class ControlledExample extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  state = {
    minutes: null,
    value: '',
  }

  handleTimeChange = minutes => {
    this.setState({ minutes })
    this.props.onChange(minutes)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (!/^\d+$/.test(this.state.value)) {
      return
    }

    this.setState({
      minutes: parseInt(this.state.value, 10),
      value: '',
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>TimeInput:</div>
          <TimeInput
            onChange={this.handleTimeChange}
            value={this.state.minutes}
          />{' '}
          (current: {this.state.minutes})
        </div>

        <br />

        <form onSubmit={this.handleSubmit}>
          <div>Set minutes to:</div>
          <input
            onChange={this.handleChange}
            placeholder="Minutes to set"
            type="text"
            value={this.state.value}
          />
          <button type="submit">Set minutes</button>
        </form>
      </div>
    )
  }
}
