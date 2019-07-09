import * as faceapi from 'face-api.js'

const MODEL_URL = process.env.PUBLIC_URL + '/models'

// Load tiny models and weights
export const loadTinyModels = async () => {
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
}

export const getTinyFullFaceDescription = async (
  blob: string,
  inputSize = 512
) => {
  const scoreThreshold = 0.5
  const faceDetectionOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  })
  const useTinyModel = true

  const img = await faceapi.fetchImage(blob)

  return await faceapi
    .detectAllFaces(img, faceDetectionOptions)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors()
}

// Load models and weights
export const loadModels = async () => {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
  await faceapi.loadFaceLandmarkModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
}

export const getFullFaceDescription = async (blob: string) => {
  // const minConfidence
  // const maxResults
  const faceDetectionOptions = new faceapi.SsdMobilenetv1Options()

  const img = await faceapi.fetchImage(blob)

  return await faceapi
    .detectAllFaces(img, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()
}

// Load Expression models and weights
export const loadExpressionModels = async () => {
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
  await faceapi.loadFaceExpressionModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
}

export const getWebcamFaceDescription = async (webcam: any, canvas: any) => {
  const inputSize = 512
  const scoreThreshold = 0.5
  const faceDetectionOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  })
  const result = await faceapi.detectSingleFace(webcam, faceDetectionOptions)

  if (!result) {
    return false
  }
  const dims = faceapi.matchDimensions(canvas, webcam, true)
  const resizedResult = faceapi.resizeResults(result, dims)
  faceapi.draw.drawDetections(canvas, resizedResult)
  return true
}
