import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import * as faceApiControl from '../face-api-control'

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
  const overlay = useRef(null)
  useEffect(() => {
    faceApiControl.loadExpressionModels()
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
    const isFindFace = await faceApiControl.getWebcamFaceDescription(
      webcam.video,
      overlay.current
    )
    if (isFindFace) {
      setImageSrc(webcam.getScreenshot())
      setIsFaceSearch(false)
      return
    }
    setTimeout(() => onPlay())
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
