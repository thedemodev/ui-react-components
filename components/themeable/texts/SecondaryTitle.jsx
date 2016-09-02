import React from 'react'
import SecondaryTitle from '../../texts/SecondaryTitle'
import themeable from '../../../lib/decorators/themeable'

export default themeable(SecondaryTitle, ({ customizations, ...props }) => ({
  ...props,
  style: {
    ...props.style,
    color: customizations.color_header
  }
}))
