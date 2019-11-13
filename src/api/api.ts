import axios from 'axios'

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export default axios.create({
  responseType: 'json',
  baseURL: ENDPOINT,
  transformRequest: [data => JSON.stringify(data)],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8;'
  },
  timeout: 10000
})
