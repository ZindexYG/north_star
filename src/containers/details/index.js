import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Row, Col, Card, DatePicker, message } from 'antd'
import { animated, useSpring, config } from 'react-spring'
import { MidCard, RightCard, LeftCard } from './componetns'
import moment from 'moment'
import _random from 'lodash.random'
import './index.less'
// import * as Api from './api.js'
//
const RangePicker = DatePicker.RangePicker

const RowCofig = {
  gutter: [16, 16]
}

const ColConfig = {
  middle: {
    xxl: 16,
    xl: 16,
    lg: 24,
    sm: 24
  },
  siber_left: {
    xxl: 8,
    xl: 8,
    lg: 24,
    sm: 24
  },
  siber_left_content: {
    xxl: 24,
    xl: 24,
    lg: 12,
    sm: 12
  },
  siber_right: {
    xxl: 6,
    xl: 24,
    lg: 24,
    sm: 24
  },
  siber_right_content: {
    xxl: 24
  }
}

const Details = props => {
const { specimen = _random(100,999999), days = _random(10,225) } =  {}
  const spring = useSpring({
    to: { specimen: Number(specimen), days },
    from: { specimen: 0, days: 0 },
    config: config.default
  })
   const location = useLocation()
   const { type } = location.state.records || {}
  return (
    <div className="result-container">
      <Row {...RowCofig} type="flex" justify="space-between" align="top">
        <Col {...ColConfig.siber_left} className="mb20">
          <Row gutter={[16, 10]} type="flex" justify="space-between" align="top">
            <Col {...{ xxl: 24, xl: 24, lg: 10, sm: 10 }}>
              <RangePicker
                size={'lagrge'}
                className="mb10 global-calendar"
                dropdownClassName={'global-calendar-dropdown'}
                allowClear={false}
                separator={'—'}
                disabled
                defaultValue={[moment().subtract(6, 'days'), moment().subtract(1, 'days'),]}
                disabledDate={current => current && current > moment().endOf('day')}
                onCalendarChange={(dates, dateStrings) => {}}
              />
              <Card title="实验已运行天数" className="num-container days mb10">
                <animated.div className="num-box">{spring.days.interpolate(x => x.toFixed(0))}</animated.div>
              </Card>
              <Card title="访客样本总数" className="num-container specimen">
                <animated.div className="num-box">
                  {spring.specimen.interpolate(x => x.toLocaleString('en-US', { maximumFractionDigits: 0 }))}
                </animated.div>
              </Card>
            </Col>
            <Col {...{ xxl: 24, xl: 24, lg: 10, sm: 10 }}>
              <LeftCard type={type}/>
            </Col>
          </Row>
        </Col>
        <Col {...ColConfig.middle} className="mb20">
          <MidCard MidConfig={ColConfig.middle} type={type} />
        </Col>
{/*        <Col {...ColConfig.siber_right} className="mb20">
          <RightCard type={type}/>
        </Col>*/}
      </Row>
    </div>
  )
}

export default Details
