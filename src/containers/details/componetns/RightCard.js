import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Spin, Button, message } from 'antd'
import _find from 'lodash.find'
import RightCardSaliency from './RightCardSaliency.js'
import RightCardTable from './RightCardTable.js'

const RightCard = props => {
  return (
    <Row gutter={[16, 10]} type="flex" justify="space-between" align="top" className="result-right-container">
      <Col span={24}>
        <Card className="saliency-card" title="实验显著性">
          <RightCardSaliency result={{ records: null }} />
        </Card>
      </Col>
      <Col span={24}>
        <Card className="result-right-table-container" title="实验对比">
          <RightCardTable result={null} />
        </Card>
      </Col>
    </Row>
  )
}

export default RightCard
