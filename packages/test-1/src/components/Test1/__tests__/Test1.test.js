import React from 'react'
import { shallow } from 'tests/test-helper'
import Test1 from '../Test1'

describe(Test1, () => {
  it('should display "Click here" text', () => {
    const component = shallow(<Test1 />)

    expect(component).toHaveText('Click here')
  })

  describe('props.className', () => {
    it('should assign the specified className', () => {
      const component = shallow(<Test1 className="some-classname" />)

      expect(component.find('button')).toHaveClassName('some-classname')
    })
  })

  describe('props.theme', () => {
    it('should assign a className for the specified theme', () => {
      const component = shallow(<Test1 theme="primary" />)

      expect(component.find('button')).toHaveClassName('theme--primary')
    })
  })
})
