import React from 'react'
import { shallow, mount } from 'enzyme'
import TimeInput from '../TimeInput'

describe(TimeInput, () => {
  it('should format the value as text', () => {
    const input = shallow(<TimeInput value={125} />)

    expect(input).toHaveValue('02h 05m')
  })

  describe('when gaining focus', () => {
    describe('if props.onFocus is defined', () => {
      it('should invoke props.onFocus', () => {
        const onFocus = jest.fn()
        const input = shallow(<TimeInput onFocus={onFocus} />)

        input.simulate('focus')

        expect(onFocus).toHaveBeenCalled()
      })
    })

    describe('if props.onFocus is not defined', () => {
      it('should not fail', () => {
        const input = shallow(<TimeInput />)

        expect(() => {
          input.simulate('focus')
        }).not.toThrow()
      })
    })

    describe('if empty', () => {
      it('should render value 0', () => {
        const input = shallow(<TimeInput />)

        input.simulate('focus')

        expect(input).toHaveValue('00h 00m')
      })
    })

    describe('if not empty', () => {
      it('should not change the current value', () => {
        const input = shallow(<TimeInput />)

        input.simulate('change', {
          target: {
            value: '0h 3m',
          },
        })

        input.simulate('focus')

        expect(input).toHaveValue('0h 3m')
      })
    })
  })

  describe('when losing focus', () => {
    describe('if props.onBlur is defined', () => {
      it('should invoke props.onBlur', () => {
        const onBlur = jest.fn()
        const input = shallow(<TimeInput onBlur={onBlur} />)

        input.simulate('blur')

        expect(onBlur).toHaveBeenCalled()
      })
    })

    describe('if props.onBlur is not defined', () => {
      it('should not fail', () => {
        const input = shallow(<TimeInput />)

        expect(() => {
          input.simulate('blur')
        }).not.toThrow()
      })
    })

    describe('if the current value is valid', () => {
      describe('and can be reformatted', () => {
        it('should reformat the current value', () => {
          const input = shallow(<TimeInput />)

          input.simulate('change', {
            target: {
              value: '0h 3m',
            },
          })

          input.simulate('blur')

          expect(input).toHaveValue('00h 03m')
        })
      })

      describe('and is well formatted', () => {
        it('should not change the current value', () => {
          const input = shallow(<TimeInput />)

          input.simulate('change', {
            target: {
              value: '00h 03m',
            },
          })

          input.simulate('blur')

          expect(input).toHaveValue('00h 03m')
        })
      })
    })

    describe('if the current value is invalid', () => {
      it('should not change the current value', () => {
        const input = shallow(<TimeInput />)

        input.simulate('change', {
          target: {
            value: '123',
          },
        })

        input.simulate('blur')

        expect(input).toHaveValue('123')
      })
    })

    describe('if the current value is empty', () => {
      describe('if not props.clearable', () => {
        it('should render the value 0', () => {
          const input = shallow(<TimeInput clearable={false} />)

          input.simulate('change', {
            target: {
              value: '',
            },
          })

          input.simulate('blur')

          expect(input).toHaveValue('00h 00m')
        })
      })
    })

    describe('if the input is controlled', () => {
      it('should reset its value', () => {
        const input = shallow(<TimeInput value={120} />)

        input.simulate('change', {
          target: {
            value: '01h 00m',
          },
        })

        expect(input).toHaveValue('01h 00m')

        input.simulate('blur')

        expect(input).toHaveValue('02h 00m')
      })
    })
  })

  describe('when the input changes', () => {
    describe('if props.onChange is defined', () => {
      describe('if the new value is valid', () => {
        it('should notify the new value in minutes', () => {
          const onChange = jest.fn()
          const input = shallow(<TimeInput onChange={onChange} />)

          input.simulate('change', {
            target: {
              value: '04h 00m',
            },
          })

          expect(onChange).toHaveBeenCalledWith(240)
        })
      })

      describe('if the new value in minutes is the same as before', () => {
        it('should notify the same value again', () => {
          const onChange = jest.fn()
          const input = shallow(<TimeInput value={120} onChange={onChange} />)

          input.simulate('change', {
            target: {
              value: '2h 00m',
            },
          })

          expect(onChange).not.toHaveBeenCalled()
        })
      })

      describe('if the new value is invalid', () => {
        it('should not notify anything', () => {
          const onChange = jest.fn()
          const input = shallow(<TimeInput onChange={onChange} />)

          input.simulate('change', {
            target: {
              value: '123',
            },
          })

          expect(onChange).not.toHaveBeenCalled()
        })
      })

      describe('if the new value is empty', () => {
        describe('if props.clearable', () => {
          it('should notify the value null', () => {
            const onChange = jest.fn()
            const input = shallow(<TimeInput clearable onChange={onChange} />)

            input.simulate('change', {
              target: {
                value: '',
              },
            })

            expect(onChange).toHaveBeenCalledWith(null)
          })
        })

        describe('if not props.clearable', () => {
          it('should notify the value 0', () => {
            const onChange = jest.fn()
            const input = shallow(
              <TimeInput clearable={false} onChange={onChange} />
            )

            input.simulate('change', {
              target: {
                value: '',
              },
            })

            expect(onChange).toHaveBeenCalledWith(0)
          })

          it('should render value 0', () => {
            const input = shallow(<TimeInput clearable={false} />)

            input.simulate('change', {
              target: {
                value: '',
              },
            })

            expect(input).toHaveValue('00h 00m')
          })
        })
      })
    })

    describe('if props.onChange is not defined', () => {
      it('should not fail', () => {
        const input = shallow(<TimeInput />)

        expect(() => {
          input.simulate('change', {
            target: {
              value: 123,
            },
          })
        }).not.toThrow()
      })
    })
  })

  describe('when pasting text', () => {
    describe('if the resulting value is valid', () => {
      it('should allow the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const event = {
          clipboardData: {
            getData: () => '1',
          },
          preventDefault: jest.fn(),
        }

        input.instance().input.selectionStart = 0
        input.instance().input.selectionEnd = 2
        input.simulate('paste', event)

        expect(event.preventDefault).not.toHaveBeenCalled()
      })
    })

    describe('if the resulting value is invalid', () => {
      it('should cancel the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const event = {
          clipboardData: {
            getData: () => '1',
          },
          preventDefault: jest.fn(),
        }

        input.instance().input.selectionStart = 3
        input.instance().input.selectionEnd = 3
        input.simulate('paste', event)

        expect(event.preventDefault).toHaveBeenCalled()
      })
    })

    describe('if props.onPaste is defined', () => {
      it('should invoke props.onPaste', () => {
        const onPaste = jest.fn()
        const input = mount(<TimeInput onPaste={onPaste} />)

        input.simulate('paste', {
          clipboardData: {
            getData: () => '1',
          },
        })

        expect(onPaste).toHaveBeenCalled()
      })
    })
  })

  describe('when typing', () => {
    describe('if the value will remain valid', () => {
      it('should allow the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const event = {
          preventDefault: jest.fn(),
          key: '1',
        }

        input.instance().input.selectionStart = 0
        input.instance().input.selectionEnd = 0
        input.simulate('keypress', event)

        expect(event.preventDefault).not.toHaveBeenCalled()
      })
    })

    describe('if the value will become invalid', () => {
      it('should cancel the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const event = {
          preventDefault: jest.fn(),
          key: 'a',
        }

        input.instance().input.selectionStart = 0
        input.instance().input.selectionEnd = 0
        input.simulate('keypress', event)

        expect(event.preventDefault).toHaveBeenCalled()
      })
    })

    describe('if the input is empty and the key pressed is a number', () => {
      it('should assign the number to hours', () => {
        const input = mount(<TimeInput />)

        input.simulate('keypress', { key: '2' })

        expect(input.find('input')).toHaveValue('02h 00m')
      })
    })

    describe('if props.onKeyPress is defined', () => {
      it('should invoke props.onKeyPress', () => {
        const onKeyPress = jest.fn()
        const input = mount(<TimeInput onKeyPress={onKeyPress} />)

        input.simulate('keypress', { key: '2' })

        expect(onKeyPress).toHaveBeenCalled()
      })
    })
  })

  describe('when updating', () => {
    describe('if receives a new value', () => {
      it('should respond to a new value', () => {
        const input = shallow(<TimeInput value={120} />)

        input.setProps({ value: 180 })

        expect(input).toHaveValue('03h 00m')
      })
    })

    describe('if receives the same value', () => {
      it('should not change the state', () => {
        const input = shallow(<TimeInput value={120} />)
        const setState = jest.fn()

        input.instance().setState = setState
        input.setProps({ value: 120 })

        expect(setState).not.toHaveBeenCalled()
      })
    })
  })

  describe('when deleting characters', () => {
    describe('if the resulting string will be invalid', () => {
      it('should cancel the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const backspaceEvent = {
          preventDefault: jest.fn(),
          key: 'Backspace',
        }
        const deleteEvent = {
          preventDefault: jest.fn(),
          key: 'Delete',
        }

        input.instance().input.selectionStart = 3
        input.instance().input.selectionEnd = 3
        input.simulate('keydown', backspaceEvent)

        expect(backspaceEvent.preventDefault).toHaveBeenCalled()

        backspaceEvent.preventDefault.mockReset()

        input.instance().input.selectionStart = 1
        input.instance().input.selectionEnd = 3
        input.simulate('keydown', backspaceEvent)

        expect(backspaceEvent.preventDefault).toHaveBeenCalled()

        input.instance().input.selectionStart = 2
        input.instance().input.selectionEnd = 2
        input.simulate('keydown', deleteEvent)

        expect(deleteEvent.preventDefault).toHaveBeenCalled()

        deleteEvent.preventDefault.mockReset()

        input.instance().input.selectionStart = 1
        input.instance().input.selectionEnd = 3
        input.simulate('keydown', deleteEvent)

        expect(deleteEvent.preventDefault).toHaveBeenCalled()
      })
    })

    describe('if the resulting string will be valid', () => {
      it('should allow the event', () => {
        const input = mount(<TimeInput defaultValue={0} />)
        const backspaceEvent = {
          preventDefault: jest.fn(),
          key: 'Backspace',
        }
        const deleteEvent = {
          preventDefault: jest.fn(),
          key: 'Delete',
        }

        input.instance().input.selectionStart = 0
        input.instance().input.selectionEnd = 0
        input.simulate('keydown', backspaceEvent)

        expect(backspaceEvent.preventDefault).not.toHaveBeenCalled()

        backspaceEvent.preventDefault.mockReset()

        input.instance().input.selectionStart = 0
        input.instance().input.selectionEnd = 4
        input.simulate('keydown', backspaceEvent)

        expect(backspaceEvent.preventDefault).not.toHaveBeenCalled()

        input.instance().input.selectionStart = 7
        input.instance().input.selectionEnd = 7
        input.simulate('keydown', deleteEvent)

        expect(deleteEvent.preventDefault).not.toHaveBeenCalled()

        deleteEvent.preventDefault.mockReset()

        input.instance().input.selectionStart = 3
        input.instance().input.selectionEnd = 7
        input.simulate('keydown', deleteEvent)

        expect(deleteEvent.preventDefault).not.toHaveBeenCalled()
      })
    })

    describe('if props.onKeyDown is defined', () => {
      it('should invoke props.onKeyDown', () => {
        const onKeyDown = jest.fn()
        const input = mount(<TimeInput onKeyDown={onKeyDown} />)

        input.simulate('keydown', { key: 'Delete' })

        expect(onKeyDown).toHaveBeenCalled()
      })
    })
  })
})
