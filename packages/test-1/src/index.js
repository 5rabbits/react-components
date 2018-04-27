import React from 'react'
import PropTypes from 'prop-types'
import I18nProvider from 'components/I18nProvider'
import Test1 from 'components/Test1'

const Test1Wrapper = ({ locale, translations, ...otherProps }) => (
  <I18nProvider locale={locale} translations={translations}>
    <Test1 {...otherProps} />
  </I18nProvider>
)

Test1Wrapper.propTypes = {
  locale: PropTypes.string,
  translations: PropTypes.object,
}

Test1Wrapper.defaultProps = {
  locale: 'en',
}

export default Test1Wrapper
