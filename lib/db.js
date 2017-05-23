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

  return _.map(townArr, (i) => {
    return {
      label: i.Nazev && i.Nazev.length && i.Nazev.length > 0 ? i.Nazev[0] : i.Nazev,
      value: i.Zkratka && i.Zkratka.length && i.Zkratka.length > 0 ? i.Zkratka[0]: i.Zkratka
    }
  })

}
