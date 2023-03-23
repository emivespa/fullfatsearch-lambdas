const https = require('https')
const dotenv = require('dotenv')

dotenv.config()
const {
  ENDPOINT,
  INDEX,
  PASSWORD,
  USER,
} = process.env

exports.handler = async (event) => {
  const { q } = event.pathParameters
  const url = `${ENDPOINT}/${INDEX}/_search?df=text&q=${q}`
  // const url = `${ENDPOINT}/${INDEX}/_search?q=${q}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(USER + ':' + PASSWORD).toString('base64'),
    },
  }
  const request = https.request(url, options)
  const response = await new Promise((resolve, reject) => {
    request.on('response', (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        })
      })
    })
    request.on('error', (err) => {
      reject(err)
    })
    request.end()
  })
  return response
}

