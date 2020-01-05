import React from 'react'
import { useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { Table } from 'antd'
import _random from 'lodash.random'
// import * as Api from '../reducer'

const PlanList = props => {
  const history = useHistory()
  // const getUserBehaviorResult = useSelector(Api.getUserBehaviorResult)
  const records = Array.from({ length: _random(1,10)}).map((el, index) => {
    const arrStr = ['PC', 'IOS']
    const planStr = ['测试实验','正式实验','灰度实验']
    return {
      planId: 1000 + index * 10,
      planName: `${arrStr[_random(0, 1)]}_${planStr[_random(0,2)]}_${_random(1,100)}`,
      type: _random(2, 3)
    }
  })

  const config = {
    size: 'small',
    bordered: false,
    dataSource: records,
    pagination: false,
    rowKey: record => record.userName,
    scroll: {
      y: records.length > 5 ? 250 : null
    },
    columns: [
      {
        title: 'ID',
        dataIndex: 'planId',
        key: 'planId',
        align: 'center'
        // width:120
      },
      {
        title: '实验名称',
        dataIndex: 'planName',
        key: 'planName',
        width: '80%',
        ellipsis: true,
        render: (text, record) => (
          <div
            className="row-container"
            onClick={e => {
              history.push({
                pathname: '/main/details',
                state: {
                  records: record
                }
              })
            }}
            title={text}>
            {text}
          </div>
        )
      }
    ]
  }

  return <Table className="no-background-table" {...config} />
}

export default PlanList
