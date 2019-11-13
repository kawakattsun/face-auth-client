import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { getWebcamFaceDescription } from '../lib/face-api-control'
import { searchFaceAuth } from '../api/face-auth-api'

interface OwnProps {
  isActive: boolean
}

const useStyles = makeStyles(() => ({
  webcam: {
    position: 'relative',
    width: '640px',
    height: '360px'
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
  facingMode: 'user'
}

export const WebcamCapture: React.FC<OwnProps> = (props: OwnProps) => {
  const { isActive } = props
  const [imageSrc, setImageSrc] = useState('')
  const [webcam, setWebcam] = useState()
  const [isFaceSearch, setIsFaceSearch] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const overlay = useRef(null)
  useEffect(() => {
    if (isActive) {
      setIsFaceSearch(true)
      setImageSrc('')
    }
  }, [isActive])
  const classes = useStyles()

  const setRefWebcam = (el: Webcam) => setWebcam(el)
  const capture = () => {
    setImageSrc(webcam.getScreenshot())
  }
  const onPlay = async () => {
    if (!isActive || !isFaceSearch || webcam.video === null) {
      return
    }
    if (webcam.video.ended || webcam.video.paused) {
      setTimeout(() => onPlay())
    }
    const faceDetect = await getWebcamFaceDescription(
      webcam.video,
      overlay.current
    )
    if (faceDetect === 'ok') {
      const face = webcam.getScreenshot()
      const b64 = face.split(',')
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
      setImageSrc(face)
      setIsFaceSearch(false)
      setAlertMessage('')
      return
    }
    if (faceDetect === 'alert') {
      setAlertMessage('カメラに近づいてください。')
    }
    setTimeout(() => onPlay())
  }

  if (!isActive) {
    return null
  }

  return (
    <React.Fragment>
      <div>{alertMessage}</div>
      <div className={classes.webcam}>
        <Webcam
          ref={setRefWebcam}
          audio={false}
          width="640"
          height="360"
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onPlay}
        />
        <canvas ref={overlay} className={classes.canvas}></canvas>
      </div>
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="Upload picture"
          component="span"
          onClick={capture}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <img src={imageSrc} alt="" />
    </React.Fragment>
  )
}
