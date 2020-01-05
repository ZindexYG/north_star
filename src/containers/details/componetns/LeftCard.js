import React from 'react'
import { Card } from 'antd'
import _random from 'lodash.random'
import moment from 'moment'
import LeftCardChart from './LeftCardChart.js'
// moment().subtract(5, 'days').format('YYYY-MM-DD'),
const LeftCard = props => {
  const { type } = props
  const records = []

  Array.from({ length: 7 }).map((el, day) => {
    return Array.from({ length: type }).map((el, index) => {
      records.push({
        versionId: 1000 + index,
        specimen: _random(1000, 3000),
        versionName: 1000 + index,
        dayStart: moment()
          .subtract(7 - Number(day), 'days')
          .format('YYYY-MM-DD')
      })
      return el
    })
  })

  return (
    <Card className="specimen-count-chart-container" title="实验样本量">
      <LeftCardChart records={records} />
    </Card>
  )
}

export default LeftCard
