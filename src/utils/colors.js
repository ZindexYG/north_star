// const colors = [
//   '#D34996',
//   '#40D8C8',
//   '#1E90FD',
//   '#8282FD',
//   '#BFD76A',
//   '#D34995',
//   '#B082EC',
//   '#D33B3C',
//   '#FE8687',
//   '#8545DE',
//   '#6DDA90',
//   '#66B5FD',
//   '#67B5FD',
//   '#BB5AF8',
//   '#2BC15C',
//   '#D599D8',
//   '#DF6F6E',
//   '#5D8EE5',
//   '#98E660',
//   '#E5955B',
//   '#4A5EB2',
//   '#F9CB21',
//   '#12C2C0'
// ]
const colors = [
  '#8282FD',
  '#E0F227',
  '#1E90FD',
  '#3FD9C8',
  '#D34995',
  '#F49E35',
  '#B082EC',
  '#D23B39',
  '#FE8687',
  '#8545DE',
  '#6BDB90',
  '#66B6FD',
  '#BB5AF8',
  '#2BC15C',
  '#D599D8',
  '#DF6F6E',
  '#5D8EE3',
  '#98E660',
  '#FE4E69',
  '#4A5FB0',
  '#F9CB22',
  '#D44A96',
  '#4B5FB3',
  '#12C2C2'
]

// rgb to Hex
const rgbToHex = (r, g, b) => {
  var hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}
// hex to rgb
const hexToRgb = hex => {
  var rgb = []
  for (var i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return rgb
}
// 颜色
const gradient = (startColor, endColor, step) => {
  // 将 hex 转换为rgb
  var sColor = hexToRgb(startColor),
    eColor = hexToRgb(endColor)

  // 计算R\G\B每一步的差值
  var rStep = (eColor[0] - sColor[0]) / step,
    gStep = (eColor[1] - sColor[1]) / step,
    bStep = (eColor[2] - sColor[2]) / step

  var gradientColorArr = []
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2]))
    )
  }
  return gradientColorArr
}
export { colors, rgbToHex, hexToRgb, gradient }

// import colors from '@/utils/colors.js'
