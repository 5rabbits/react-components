import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { minutesToString, stringToMinutes, isValidString } from 'helpers'

export default class TimeInput extends Component {
  static propTypes = {
    clearable: PropTypes.bool,
    defaultValue: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onPaste: PropTypes.func,
    value: PropTypes.number,
  }

  static defaultProps = {
    clearable: true,
  }

  state = {
    minutes:
      this.props.value === undefined
        ? this.props.defaultValue
        : this.props.value,
    value: minutesToString(
      this.props.value === undefined
        ? this.props.defaultValue
        : this.props.value
    ),
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.minutes !== nextProps.value &&
      nextProps.value !== undefined
    ) {
      this.setState({
        minutes: nextProps.value,
        value: minutesToString(nextProps.value),
      })
    }
  }

  getNewValue = change =>
    this.state.value.substring(0, this.input.selectionStart) +
    change +
    this.state.value.substring(this.input.selectionEnd)

  handleFocus = event => {
    if (!this.state.value) {
      this.setState({ value: minutesToString(0) })
    }

    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    const formatted = minutesToString(
      this.props.value === undefined ? this.state.minutes : this.props.value
    )

    if (isValidString(this.state.value) && this.state.value !== formatted) {
      this.setState({ value: formatted })
    }

    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  handleKeyPress = event => {
    if (!this.state.value.trim() && /\d/.test(event.key)) {
      const minutes = parseInt(event.key, 10) * 60

      this.setState(
        {
          minutes,
          value: minutesToString(minutes),
        },
        () => {
          this.input.selectionStart = 2
          this.input.selectionEnd = 2
        }
      )

      this.notifyChange(minutes)
    }

    if (!isValidString(this.getNewValue(event.key))) {
      event.preventDefault()
    }

    if (this.props.onKeyPress) {
      this.props.onKeyPress(event)
    }
  }

  handleKeyDown = event => {
    let next = this.state.value
    const { selectionStart, selectionEnd } = this.input

    switch (event.key) {
      case 'Backspace':
        if (selectionStart === selectionEnd && selectionStart > 0) {
          next =
            this.state.value.substring(0, selectionStart - 1) +
            this.state.value.substring(selectionEnd)
        } else if (selectionStart !== selectionEnd) {
          next =
            this.state.value.substring(0, selectionStart) +
            this.state.value.substring(selectionEnd)
        }
        break

      case 'Delete':
        if (
          selectionStart === selectionEnd &&
          selectionStart < this.state.value.length
        ) {
          next =
            this.state.value.substring(0, selectionStart) +
            this.state.value.substring(selectionEnd + 1)
        } else if (selectionStart !== selectionEnd) {
          next =
            this.state.value.substring(0, selectionStart) +
            this.state.value.substring(selectionEnd)
        }
        break
    }

    if (!isValidString(next) && next !== this.state.value) {
      event.preventDefault()
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
  }

  handlePaste = event => {
    const pasted = event.clipboardData.getData('text/plain')

    if (!isValidString(this.getNewValue(pasted))) {
      event.preventDefault()
    }

    if (this.props.onPaste) {
      this.props.onPaste(event)
    }
  }

  handleChange = event => {
    const newValue = event.target.value
    const newMinutes = stringToMinutes(newValue)

    if (newMinutes !== false) {
      this.notifyChange(newMinutes)
    } else if (!newValue) {
      this.notifyChange(this.props.clearable ? null : 0)
    }

    if (!newValue && !this.props.clearable) {
      this.setState({ value: minutesToString(0) })
    } else {
      this.setState({ value: newValue })
    }
  }

  notifyChange = minutes => {
    if (this.state.minutes === minutes) {
      return
    }

    this.setState({ minutes }, () => {
      if (this.props.onChange) {
        this.props.onChange(minutes)
      }
    })
  }

  inputRef = input => {
    this.input = input
  }

  render() {
    const { ...props } = this.props
    const { value } = this.state

    delete props.clearable
    delete props.defaultValue

    return (
      <input
        {...props}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onPaste={this.handlePaste}
        ref={this.inputRef}
        type="text"
        value={value || ''}
      />
    )
  }
}
