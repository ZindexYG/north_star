import React from 'react'
import { Button } from 'antd'
import './featureButton.less'

const FeatureButton = props => {
  return (
    <div className="feature-button-wrapper">
      <Button {...props} />
    </div>
  )
}

export default FeatureButton
