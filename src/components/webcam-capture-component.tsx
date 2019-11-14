import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { getWebcamFaceDescription } from '../lib/face-api-control'
import { searchFaceAuth, collectFaceAuth } from '../api/face-auth-api'
import WebcamCaptureSubmitComponent from './webcam-capture-submit-component'

interface OwnProps {
  isActive: boolean
  type: string
}

const useStyles = makeStyles(() => ({
  webcam: {
    position: 'relative',
    width: '1280px',
    height: '720px'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
}))

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const WebcamCaptureComponent: React.FC<OwnProps> = (props: OwnProps) => {
  let detectedImageSRC: string
  const { isActive, type } = props
  const [webcam, setWebcam] = useState()
  const [isFaceSearch, setIsFaceSearch] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [userID, setUserID] = useState('')
  const overlay = useRef<HTMLCanvasElement>(null)
  const detectFaceCanvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (isActive) {
      setIsFaceSearch(true)
    }
  }, [isActive])
  const classes = useStyles()

  const setRefWebcam = (el: Webcam) => setWebcam(el)

  const runFaceDetect = async () => {
    if (!overlay.current || !detectFaceCanvas.current) {
      return false
    }
    const faceDetect = await getWebcamFaceDescription(
      webcam.video,
      overlay.current
    )
    if (faceDetect === '') {
      return false
    }
    if (faceDetect === 'alert') {
      setAlertMessage('カメラに近づいてください。')
      return false
    }

    setAlertMessage('')

    const face = webcam.getScreenshot()
    const canvas = detectFaceCanvas.current
    canvas.width = faceDetect.width
    canvas.height = faceDetect.height
    const context = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      if (!context) {
        return
      }
      context.drawImage(
        image,
        faceDetect.x,
        faceDetect.y,
        faceDetect.width,
        faceDetect.height,
        0,
        0,
        faceDetect.width,
        faceDetect.height
      )
      detectedImageSRC = canvas.toDataURL('image/jpeg')
      switch (type) {
        case 'auth':
          const b64 = detectedImageSRC.split(',')
          searchFaceAuth({
            image: b64[1]
          })
            .then(response => {
              console.log(response.data)
              if (response.data.rekognition.FaceMatches.length > 0) {
                setAlertMessage('認証しました。')
              } else {
                setAlertMessage('登録されておりません。')
              }
            })
            .catch(e => {
              console.error(e)
              return
            })
          break

        case 'upload':
          setAlertMessage('顔登録しますか？')
          break
      }
    }
    image.src = face

    return true
  }

  const capture = () => {
    runFaceDetect()
  }

  const handleChageUserID = (event: any) => {
    setUserID(event.target.value)
  }

  const onUpload = () => {
    if (detectedImageSRC.length <= 0) {
      return
    }
    const b64 = detectedImageSRC.split(',')
    collectFaceAuth({
      user_id: userID,
      image: b64[1]
    })
      .then(response => {
        console.log(response.data)
        setAlertMessage('登録が完了しました。')
      })
      .catch(e => {
        console.error(e)
        return
      })
  }

  const onPlay = async () => {
    if (!isActive || !isFaceSearch || !webcam.video) {
      return
    }
    if (webcam.video.ended || webcam.video.paused) {
      setTimeout(() => onPlay(), 1000)
    }
    const end = await runFaceDetect()
    if (end) {
      setIsFaceSearch(false)
      return
    }
    setTimeout(() => onPlay(), 200)
  }

  if (!isActive) {
    return null
  }

  return (
    <React.Fragment>
      <div className={classes.webcam}>
        <Webcam
          ref={setRefWebcam}
          audio={false}
          width="1280"
          height="720"
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onPlay}
        />
        <canvas ref={overlay} className={classes.canvas}></canvas>
      </div>
      <div>{alertMessage}</div>
      <div>
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="Capture"
            component="span"
            onClick={capture}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
      <div>
        <canvas ref={detectFaceCanvas}></canvas>
      </div>
      {type === 'upload' && (
        <WebcamCaptureSubmitComponent
          userID={userID}
          handleChageUserID={handleChageUserID}
          onUpload={onUpload}
        />
      )}
    </React.Fragment>
  )
}

export default WebcamCaptureComponent
