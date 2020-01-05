import React, { useState,useEffect } from 'react'
import { Chart, Geom, Tooltip, Legend, Axis } from 'bizcharts'
import moment from 'moment'
import { DataSet } from '@antv/data-set'

const { DataView } = DataSet

const MidCardChart = props => {
  const { records = [], height = 400 } = props

  const [chartsResult, setChartsResult] = useState({
    dv: new DataView(),
    minDay: 0,
    maxDay: 0
  })

  useEffect(() => {
    const dv = new DataView()
    const recordsFilter = []
    const fields = []
    const dayArr = []
    let minDay = ''
    let maxDay = ''
    records &&
      records.map((record, index) => {
        const name = `实验_${record.versionId}_${record.versionName}`
        // const day = record.dayStart

        minDay = !minDay
          ? record.dayStart
          : moment(record.dayStart, 'x') < moment(minDay, 'x')
          ? record.dayStart
          : minDay

        maxDay = !maxDay
          ? record.dayStart
          : moment(record.dayStart, 'x') > moment(maxDay, 'x')
          ? record.dayStart
          : maxDay

        if (fields.indexOf(name) === -1) {
          fields.push(name)
        }

        if (dayArr.indexOf(record.dayStart) === -1) {
          dayArr.push(record.dayStart)
          recordsFilter.push({
            day: record.dayStart,
            [name]: Number(record.specimen)
          })
        } else {
          recordsFilter.map(field => {
            if (field.day === record.dayStart) {
              field[name] = Number(record.specimen)
            }
            return field
          })
        }
        return record
      })

    dv.source(recordsFilter).transform({
      type: 'fold',
      fields,
      key: 'versionName',
      value: 'specimen'
    })

    setChartsResult({ dv, minDay, maxDay })
  }, [records])

  const scale = {
    day: {
      formatter: value => moment(value).format('YYYY-MM-DD'),
      min: moment(chartsResult.minDay).format('YYYY-MM-DD'),
      max: moment(chartsResult.minDay).format('YYYY-MM-DD')
    },
    specimen: {
      min: 0
    }
  }
  return (
    <Chart
      data={records && records.length ? chartsResult.dv : []}
      scale={scale}
      forceFit
      placeholder
      height={height}
      padding={[10, 40, 120, 40]}>
      <Legend
        formatter={(text, item, index) =>
          text
            .split('_')
            .slice(0, text.split('_').length - 1)
            .toString()
            .replace(/,/gi, '_')
        }
      />
      <Axis name="day" />
      <Axis name="specimen" />
      <Tooltip crosshairs={{ type: 'y' }} />

      <Geom
        type="line"
        size={1.5}
        position="day*specimen"
        color={['versionName']}
        shape={'smooth'}
        tooltip={[
          'day*versionName*specimen',
          (day, versionName, specimen) => ({
            title: day,
            name: versionName
              .split('_')
              .slice(0, versionName.split('_').length - 1)
              .toString()
              .replace(/,/gi, '_'),
            value: specimen !== undefined ? specimen : ''
          })
        ]}
      />
      <Geom
        type="point"
        size={1}
        position="day*specimen"
        color={['versionName']}
        shape={'circle'}
        tooltip={[
          'day*versionName*specimen',
          (day, versionName, specimen) => ({
            title: day,
            name: versionName
              .split('_')
              .slice(0, versionName.split('_').length - 1)
              .toString()
              .replace(/,/gi, '_'),
            value: specimen !== undefined ? specimen : ''
          })
        ]}
      />
      <Geom
        type="area"
        position="day*specimen"
        color={['versionName', ['rgba(43, 144, 242,.1)']]}
        tooltip="false"
        shape="smooth"
      />
    </Chart>
  )
}

export default MidCardChart
