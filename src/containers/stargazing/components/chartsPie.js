import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Chart, Geom, Axis, Tooltip, Coord, Guide, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'
import { colors } from '@/utils/colors'

const { Html } = Guide

const useClientRect = () => {
  const [rect, setRect] = useState(null)
  const { width } = useSelector(state => state.resizeReducer)
  const ref = useCallback(
    node => {
      if (node !== null && width !== null) {
        setRect(node.getBoundingClientRect())
      }
    },
    [width]
  )
  return [rect, ref]
}

const ChartsPie = props => {
  const { title } = props
  // const [rect, ref] = useClientRect()
  // const { width = 0 } = rect || {}

  const [dv, setDv] = useState([])

  useEffect(() => {
    const platform = ['PC', 'M', 'iOS', 'Android']
    const { result = [] } = props
    const data = result.map(item => ({
      item: item.productLineName ? item.productLineName : platform[item.platform],
      count: item.planNum
    }))
    const { DataView } = DataSet
    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    })
    setDv(dv)
  }, [props])

  const cols = {
    percent: {
      formatter: val => {
        val = (val * 100).toFixed(2) + '%'
        return val
      }
    }
  }

  return (
    <div >
      <Chart height={300} data={dv} scale={cols} forceFit={true} padding={[0, 0, 60, 0]}>
        <Coord type={'theta'} radius={0.75} innerRadius={0.75} />
        <Axis name="percent" />
        <Tooltip showTitle={false} inPlot={false} />
        <Guide>
          <Html
            position={['50%', '50%']}
            html={`<div style="color:#fff;font-size:1.16em;text-align: center;width: 10em;">${title}</div>`}
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          select={[false]}
          type="intervalStack"
          position="percent"
          color={['item',colors]}
          tooltip={[
            'item*percent*count',
            (item, percent, count) => {
              percent = Math.floor(percent * 100) + '%'
              return {
                name: item,
                value: `${count}个（${percent}）`
              }
            }
          ]}
          style={{
            lineWidth: 0,
            stroke: '#fff'
          }}
        />
        <Legend name={'item'} />
      </Chart>
    </div>
  )
}

export default ChartsPie
