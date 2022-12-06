import db from '../../db'
import axios from "axios"
import xml2js from 'xml2js'
import _ from 'underscore'

const ARES_URL = 'https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_std.cgi?ico={{ID}}'

export async function get (id) {
  const info = await db.conn.get('SELECT id, name FROM ARES_SUBJECTS WHERE id = ?', id)
  if (info) return info
  return load (id)
}

function parse (xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
async function load (id) {
  const url = ARES_URL.replace('{{ID}}', id)
  console.log(url)
  const xml = await axios.get(url)
  const json = await parse(xml.data)
  const rec = json['are:Ares_odpovedi']['are:Odpoved'][0]['are:Zaznam'][0]
  const val = {
    id: Number(rec['are:ICO'][0]),
    name: rec['are:Obchodni_firma'][0],
    info: rec
  }
  await db.conn.run(
    'INSERT INTO ARES_SUBJECTS (id, name, info) VALUES (?, ?, ?)',
    val.id, val.name, rec
  )
  return _.omit(val, 'info')
}