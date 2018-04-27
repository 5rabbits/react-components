import React from 'react'
import PropTypes from 'prop-types'
import { translate } from '@5rabbits/react-polyglot'
import classNames from 'classnames'
import css from './Test1.css'

const Test1 = ({ className, t, theme, ...otherProps }) => (
  <button
    className={classNames(css['my-library'], css[`theme--${theme}`], className)}
    type="button"
    {...otherProps}
  >
    {t('clickHere')}
  </button>
)

Test1.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func,
  theme: PropTypes.oneOf(['default', 'primary']),
}

Test1.defaultProps = {
  theme: 'default',
}

export default translate()(Test1)
