const axios = require('axios')
const xml2js = require('xml2js')
const _ = require('lodash')
let parsed = null
// const url = 'https://seznam.gov.cz/ovm/datafile.do?format=xml&service=seznamovm'
const url = 'https://www.mojedatovaschranka.cz/sds/datafile.do?format=xml&service=seznam_ds_ovm'

axios.get(url)
.then(res => {
  xml2js.parseString(res.data, (err, result) => {
    if (err) {
      throw err
    }
    parsed = result
  })
})

function _getAtt (a) {
  return (a && a.length && a.length > 0) ? a[0] : a
}

exports.towns = () => {
  const townArr = _.filter(parsed.list.box, (s) => {
    return s.PravniForma[0].$.type === '801'
  })
  return _.map(townArr, (i) => {
    return {
      label: _getAtt(i.Nazev),
      value: _getAtt(i.Zkratka),
      ico: _getAtt(i.ICO)
    }
  })
}

exports.ico = () => {
  const addr = {}
  _.map(parsed.list.box, (s) => {
    const zip = s.address[0].zip
    if (!(zip in addr)) {
      addr[zip] = s.address[0]
    }
  })
  return _.map(addr, (v, k) => {
    return {
      label: v.city[0],
      zip: k,
      dis: v.district[0] === v.city[0] ? null : v.district[0]
    }
  })
}
