import api from '../api'

interface FaceAuthParams {
  name: string
  body: string
}

export const postFaceAuth = (params: FaceAuthParams) => {
  return api
    .post('/face', params)
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.error(e)
      return []
    })
}
