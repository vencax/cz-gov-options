const axios = require('axios')
const xml2js = require('xml2js')
const _ = require('lodash')
let parsed = null
const url = 'https://seznam.gov.cz/ovm/datafile.do?format=xml&service=seznamovm'

axios.get(url)
.then(res => {
  xml2js.parseString(res.data, (err, result) => {
    if (err) {
      throw err
    }
    parsed = result
  })
})

exports.towns = function() {

  const townArr = _.filter(parsed.SeznamOvmIndex.Subjekt, (s) => {
    return s.PravniForma[0].$.type === '801'
  })

  _getAtt(a) {
    return (a && a.length && a.length > 0) ? a[0] : a
  }

  return _.map(townArr, (i) => {
    return {
      label: _getAtt(i.Nazev),
      value: _getAtt(i.Zkratka),
      ico: _getAtt(i.ICO)
    }
  })

}
