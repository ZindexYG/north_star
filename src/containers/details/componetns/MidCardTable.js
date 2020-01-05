import React from 'react'
import { Table } from 'antd'
// import moment from 'moment'
// import _sortby from 'lodash.sortby'
import _uniqby from 'lodash.uniqby'

const MidCardTable = props => {
  const { records } = props

  const initTDColumns = [{ title: '版本名称', dataIndex: 'versionName', key: 'versionName', fixed: 'left', width: 165 }]

  const versionInfos = _uniqby(records, 'versionId')
  const columns = []

  const source = versionInfos.map(version => {
    return {
      key: version.versionId,
      versionName: `实验_${version.versionName}`
    }
  })

  records.map((el, index) => {
    columns.push({
      title: el.dayStart,
      dataIndex: el.dayStart,
      key: el.dayStart,
      specimen: el.specimen,
      id: el.versionId
    })
    return el
  })

  source.map(el => {
    columns.map(item => {
      if (el.key === Number(item.id)) {
        el[item.key] = item.specimen
      }
      return item
    })
    return el
  })

  const tableConfig = {
    columns: initTDColumns.concat(_uniqby(columns, 'key').reverse()),
    source: source
  }
  const scrollConfig = {
    x: tableConfig.columns.length < 8 ? null : tableConfig.columns.length * 225,
    y: tableConfig.source.length < 4 ? null : tableConfig.source.length * 185
  }

  return (
    <Table
      size="small"
      columns={tableConfig.columns}
      className="no-background-table"
      dataSource={tableConfig.source}
      scroll={scrollConfig}
      pagination={false}
    />
  )
}

export default MidCardTable
