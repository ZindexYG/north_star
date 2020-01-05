import { colors } from './colors.js'
// tooltip 相关 dom 的 css 类名
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip'
// const LEGEND_CONTAINER_CLASS = 'g2-legend'

// const TOOLTIP_TITLE_CLASS = 'g2-tooltip-title'
// const TOOLTIP_LIST_CLASS = 'g2-tooltip-list'
// const TOOLTIP_LIST_ITEM_CLASS = 'g2-tooltip-list-item'
// const TOOLTIP_MARKER_CLASS = 'g2-tooltip-marker'
// const TOOLTIP_VALUE_CLASS = 'g2-tooltip-value'

// const COLOR_PLATE_8 = ['#1890FF', '#2FC25B', '#FACC14', '#8543E0', '#13C2C2', '#3436C7', '#F04864', '#223273']
// const COLOR_PLATE_8 = ['#1890FF', '#2FC25B', '#FACC14', '#8543E0', '#13C2C2', '#3436C7', '#F04864', '#223273']
// console.log('color', colors)
const COLOR_PLATE_8 = colors

const GlobalTheme = {
  colors: COLOR_PLATE_8,
  showSinglePoint: true,
  plotCfg: {
    padding: [500, 500, 600, 100]
  },
  axis: {
    left: {
      position: 'left',
      title: null,
      label: {
        offset: 8,
        autoRotate: true,
        textStyle: {
          fill: '#47608A'
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#47608A'
      },
      tickLine: null,
      grid: {
        zIndex: -1,
        lineStyle: {
          stroke: '#47608A',
          lineWidth: 1,
          lineDash: [9, 5]
        },
        hideFirstLine: true
      }
    },
    bottom: {
      position: 'bottom',
      title: null,
      label: {
        offset: 16,
        autoRotate: true,
        textStyle: {
          fill: '#47608A',
          fontSize: 12,
          lineHeight: 16,
          textBaseline: 'middle'
        }
      },
      line: {
        lineWidth: 1,
        stroke: '#47608A'
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#47608A',
        length: 4,
        alignWithLabel: true
      }
    }
  },
  tooltip: {
    [`${TOOLTIP_CONTAINER_CLASS}`]: {
      backgroundColor: 'rgba(29,39,54, 1)',
      boxShadow: 'rgb(20, 78, 127) 0px 0px 15px 10px inset',
      color: 'rgb(255, 255, 255)',
      border: '1px solid rgb(5,119,208)',
      borderRadius: '4px'
    }
  },
  tooltipCrosshairsRect: {
    rectStyle: {
      fill: '#0092FE',
      opacity: 0.9
    }
  },
  tooltipCrosshairsLine: {
    lineStyle: {
      stroke: '#0092FE',
      lineWidth: 3
    }
  },
  shape: {
    hollowPoint: {
      lineWidth: 3
    }
  },
  legend: {
    bottom: {
      width: 200,
      textStyle: {
        fill: '#fff',
        fontSize: 12
      }
    }
  },
  label: {}
}
// 050B39
// 0092FE
export default GlobalTheme
