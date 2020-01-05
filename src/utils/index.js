/**
 * 检验数组是否重复，返回后一个 key 值
 * @param  {[type]}  arr [传入数组]
 * @return { key && Boolean}     [返回后一个 key]
 */
function isRepeat(arr) {
  var hash = {}
  for (var i in arr) {
    if (hash[arr[i]]) return i
    hash[arr[i]] = true
  }
  return false
}
/**
 * 去重
 * @param  {[type]} arr [传入数组]
 * @return {[type]}     [返回不带重复的数组]
 */
function unique(arr) {
  return Array.from(new Set(arr))
}

// 使用语法：passwordLevel(string)
// 验证规则：数字、大写字母、小写字母、特殊字符
// 函数结果：返回密码中包含的规则数
// 运行例子：
/**
 * 密码等级校验
 * @param  {[String]} password [检验：数字，大小写字母，特殊字符]
 * @return {[Number]}          [返回：单例=1.随规则增多而+1 最高4]
 */
const passwordLevel = password => {
  let Modes = 0
  for (let i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i))
  }
  return bitTotal(Modes)

  //CharMode函数
  function CharMode(iN) {
    if (iN >= 48 && iN <= 57)
      //数字
      return 1
    if (iN >= 65 && iN <= 90)
      //大写字母
      return 2
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      //大小写
      return 4
    else return 8 //特殊字符
  }

  //bitTotal函数
  function bitTotal(num) {
    Modes = 0
    for (let i = 0; i < 4; i++) {
      if (num & 1) Modes++
      num >>>= 1
    }
    return Modes
  }
}
/**
 *
 * 对象转URL
 */
function urlEncode(data) {
  var _result = []
  for (var key in data) {
    var value = data[key]
    if (value.constructor === Array) {
      console.log('get请求参数不支持数组')
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}

/**
 * [checkDecimal 检验是否为小数]
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
function checkDecimal(number) {
  if (!isNaN(number)) {
    var reg = /[0-9]\.\d+$/
    return reg.test(number)
  }
  return false
}
export { isRepeat, unique, passwordLevel, urlEncode,checkDecimal }
