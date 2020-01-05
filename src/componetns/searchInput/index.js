import React from 'react'
import { Input } from 'antd'
import './searchInput.less'

const SearchInput = props => {
  const { width = 'Initial' } = props
  return (
    <div className="search-input-wrapper" style={{ width: width }}>
      <Input className="search-input" {...props} />
    </div>
  )
}

export default SearchInput
