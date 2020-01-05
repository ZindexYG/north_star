import React from 'react'
import { Icon } from 'antd'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_854671_q412psv761b.js' // 在 iconfont.cn 上生成
})

const IconFont = props => <MyIcon {...props} />

export default IconFont
