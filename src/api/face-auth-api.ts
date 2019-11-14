import api from './api'

interface SerarchFaceParams {
  image: string | ArrayBuffer
}

export const searchFaceAuth = (params: SerarchFaceParams) => {
  return api.post('/searchface', params)
}

interface SaveFaceParams {
  userID: string
  image: string | ArrayBuffer
}

export const collectFaceAuth = (params: SaveFaceParams) => {
  return api.post('/saveface', params)
}
