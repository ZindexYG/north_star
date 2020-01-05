import React from 'react'
import { Row, Col, DatePicker, Card } from 'antd'
import { animated, useSpring, config } from 'react-spring'
import { ChartsPie, ChartsLine, PlanList } from './components'
import _random from 'lodash.random'
import moment from 'moment'
import './index.less'

const RangePicker = DatePicker.RangePicker

const RowCofing = {
  gutter: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32
  }
}

const ColConfig = {
  left: {
    xxl: 8,
    xl: 8,
    lg: 24,
    sm: 24
  },
  left_content: {
    xxl: 24,
    xl: 24,
    lg: 12,
    sm: 12
  },
  middle: {
    xxl: 8,
    xl: 16,
    lg: 24,
    sm: 24
  },
  middle_content: {},
  right: {
    xxl: 8,
    xl: 24,
    lg: 24,
    sm: 24
  },
  right_content: {}
}
// moment().subtract(6, 'days')
const Stargzing = props => {
  const {
    platformRecords = [
      {
        platform: 0,
        planNum: _random(5, 75),
      },
      {
        platform: 1,
        planNum: _random(5, 75),
      },
      {
        platform: 2,
        planNum: _random(5, 75),
      },
      {
        platform: 3,
        planNum: _random(5, 75),
      }
    ],
    productRecords = [
      {
        productLineName: 'D',
        planNum: _random(5, 75),
      },
      {
        productLineName: 'G',
        planNum: _random(5, 75),
      }
    ]
  } = {}
  const {
    interfaceRecords = [
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(6, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(5, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(4, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(3, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'D',
        recordDay: moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(6, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(5, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(4, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(3, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      },
      {
        productLineName: 'G',
        recordDay: moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
        serviceNum: _random(999, 2000),
        avgTime: _random(1, 10, false)
      }
    ],
    planNum = _random(1, 99),
    avgTime = _random(0, 2, true),
    interfaceNum = _random(50000000, 500000000)
  } = {}
  const interfaceRecordsList = [],
    avgTimeList = []

  interfaceRecords.map(item => {
    interfaceRecordsList.push(
      Object.assign(
        {},
        {
          recordDay: item.recordDay,
          [item.productLineName]: item.serviceNum
        }
      )
    )
    avgTimeList.push(
      Object.assign(
        {},
        {
          recordDay: item.recordDay,
          [item.productLineName]: item.avgTime
        }
      )
    )
    return item
  })

  const spring = useSpring({
    to: { planNum, avgTime, interfaceNum: interfaceNum },
    from: { planNum: 0, avgTime: 0, interfaceNum: 0 },
    config: config.default
  })
  return (
    <div className="stargazing-container">
      <Row {...RowCofing} type="flex" align="top">
        <Col {...ColConfig.left} span={8}>
          <Row type="flex" align="top">
            <Col className="mb20" span={24} style={{ textAlign: 'center' }}>
              <RangePicker
                size={'lagrge'}
                className="global-calendar"
                dropdownClassName={'global-calendar-dropdown'}
                allowClear={false}
                separator={'—'}
                disabled
                defaultValue={[moment().subtract(6, 'days'), moment().subtract(1, 'days'),]}
                ranges={{
                  今天: [moment(), moment()],
                  近7天: [moment().subtract(6, 'days'), moment()],
                  近30天: [moment().subtract(29, 'days'), moment()],
                  近90天: [moment().subtract(89, 'days'), moment()]
                }}
                disabledDate={current => current && current > moment().endOf('day')}
                onCalendarChange={(dates, dateStrings) => {}}
              />
            </Col>
            <Col className="mb20" span={24}>
              <Card title="实验分布">
                <Row>
                  <Col span={12}>
                    <ChartsPie title={'产品线'} result={productRecords} />
                  </Col>
                  <Col span={12}>
                    <ChartsPie title={'终端'} result={platformRecords} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col className="mb20" span={24}>
              <Card title="实验列表" className="user-action-container">
                <PlanList />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col {...ColConfig.middle} className="mb20" span={8}>
          <Card title="总览" style={{ minHeight: '845px' }}>
            <Row>
              <Col span={24} className="mb20">
                <div className="interfaceNum-container">
                  <div className="tag-context">调用接口次数</div>
                  <animated.div className="num-tag">
                    {spring.interfaceNum.interpolate(x => x.toLocaleString('en-US', { maximumFractionDigits: 0 }))}
                  </animated.div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-tag avg-time-container">
                  <div className="tag-context">平均响应速度</div>
                  <div className="num-wrapper">
                    <animated.span>
                      {spring.avgTime.interpolate(x => x.toLocaleString('en-US', { maximumFractionDigits: 2 }))}
                    </animated.span>
                    <span className="tag-unit">ms</span>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-tag plan-num-container">
                  <div className="tag-context">新增有效实验</div>
                  <div className="num-wrapper">
                    <animated.span>{spring.planNum.interpolate(x => x.toFixed(0))}</animated.span>
                    <span className="tag-unit">个</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col {...ColConfig.right} span={8}>
          <Row {...RowCofing} type="flex" align="top">
            <Col className="mb20" span={24}>
              <Card title="每日调用次数">
                <ChartsLine height={340} result={interfaceRecordsList} />
              </Card>
            </Col>
            <Col className="mb20" span={24}>
              <Card title="每日响应速度">
                <ChartsLine height={340} result={avgTimeList} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Stargzing
