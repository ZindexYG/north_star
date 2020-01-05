import React, { useState, useEffect } from 'react'
import { Chart, Geom, Tooltip, Legend, Axis } from 'bizcharts'
// import { message } from 'antd'
import DataSet from '@antv/data-set'
import moment from 'moment'

// BizCharts.setTheme('dark')
// console.log('biz',BizCharts)
const ChartsLine = props => {
  const [data, setData] = useState([])
  const { height = 300 } = props
  // const [lineName, setLineName] = useState([])

  useEffect(() => {
    const { result } = props
    let newArr = []
    for (let i = 0; i < result.length; i++) {
      let flag = true
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j].recordDay === result[i].recordDay) {
          newArr[j] = { ...newArr[j], ...result[i] }
          flag = false
        }
      }
      if (flag) {
        newArr.push(result[i])
      }
    }
    let keyArr = []
    newArr.forEach(item => {
      keyArr = [...keyArr, ...Object.keys(item)]
    })
    let lineNameList = Array.from(new Set(keyArr))
    lineNameList.shift()
    if (newArr.length > 1) {
      // 时间不是今天时
      // 添加无数据时间
      let timeArr = []
      newArr.forEach((obj, i) => {
        timeArr.push(new Date(obj.recordDay).getTime())
      })
      let maxTime = timeArr.reduce((pre, cur) => {
        return cur > pre ? cur : pre
      })
      let minTime = timeArr.reduce((pre, cur) => {
        return cur > pre ? pre : cur
      })
      let newTimeArr = []
      let total = (maxTime - minTime) / (24 * 3600 * 1000)
      for (let index = 0; index <= total; index++) {
        let tempTime = minTime + 24 * 3600 * 1000 * index
        if (tempTime <= maxTime) {
          newTimeArr.push(moment(tempTime).format('YYYY-MM-DD'))
        }
      }

      newTimeArr.forEach(item => {
        let flag = true
        newArr.forEach((obj, i) => {
          if (obj.recordDay === item) {
            flag = false
          }
        })
        if (flag) {
          newArr.push({
            recordDay: item
          })
        }
      })

      // 所有时间添加无数据产品线
      lineNameList.forEach(item => {
        newArr.forEach((obj, i) => {
          if (!Object.keys(obj).includes(item)) {
            obj[item] = 0
          }
        })
      })
    }

    const ds = new DataSet()
    const data = ds.createView().source(newArr)
    data.transform({
      type: 'fold',
      fields: lineNameList,
      // 展开字段集
      key: 'city',
      // key字段
      value: 'value' // value字段
    })

    setData(data)
  }, [props])

  const cols = {
    value: {
      formatter: function(val) {
        let arr = val.toString().split('.')
        let newNum = arr[0].replace(/(?!\b)(?=(\d{3})+$)/g, ',')
        arr[0] = newNum
        return arr.join('.')
      }
    },
    recordDay: {
      range: [0, 1]
    }
  }
  // rgb(43, 144, 242)
  return (
    <Chart height={height} padding={[10, 40, 75, 70]} data={data} scale={cols} forceFit>
      <Legend marker="circle" textStyle={{}} />
      <Axis name="recordDay" />
      <Axis name="value" />

      <Geom type="line" position="recordDay*value" size={2} color={'city'} style={{}} shape={'smooth'} />
      <Geom type="point" position="recordDay*value" size={2} color={'city'} style={{}} />
      <Geom type="area" position="recordDay*value" color={['city', ['rgba(43, 144, 242,.1)']]} tooltip="false" shape="smooth" />
      <Tooltip crosshairs={{ type: 'y' }} />
    </Chart>
  )
}

export default ChartsLine
