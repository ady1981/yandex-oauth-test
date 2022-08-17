import express from 'express'
import https from 'https'
import { Buffer } from 'buffer'
import querystring from 'querystring'

const {
  YANDEX_CLIENT_ID: clientId,
  YANDEX_CLIENT_SECRET: clientSecret
} = process.env

function methodPost (code) {
  const postData = querystring.stringify({
    grant_type: 'authorization_code',
    code
  });
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const req = https.request({  
    hostname: 'oauth.yandex.ru',
    port: 443,
    path: `/token`,
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      Authorization: `Basic ${auth}`
    }
  }, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => console.log('d', chunk))
  })

  req.write(postData)
  req.end()
}

const router = express.Router();

router.get('/', (req, res) => res.json({ auth: 'get /' }))
router.get('/yandex/callback', (req, res) => {
  console.log('query', req.query)
  const { code } = req.query

  methodPost(code)
  
  res.json({ query: req.query })
})

export {
  router
}
