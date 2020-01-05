import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'antd'
import _random from 'lodash.random'
import moment from 'moment'

import MidCardChart from './MidCardChart.js'
import MidCardTable from './MidCardTable.js'

const MidCard = props => {
  const MidCardChartRecords = []
  const { type } = props

  Array.from({ length: 7 }).map((el, day) => {
    return Array.from({ length: type }).map((el, index) => {
      MidCardChartRecords.push({
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
    <Row gutter={[16, 10]} type="flex" justify="space-between" align="top">
      <Col span={24}>
        <Card className="mid-card-chart-container" title="实验分析">
          <MidCardChart records={MidCardChartRecords} />
        </Card>
      </Col>
      <Col span={24}>
        <Card className="result-mid-table-container" title="实验明细">
          <MidCardTable records={MidCardChartRecords} type={type} />
        </Card>
      </Col>
    </Row>
  )
}

export default MidCard
