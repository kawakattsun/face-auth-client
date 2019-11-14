import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { getWebcamFaceDescription } from '../lib/face-api-control'
import { searchFaceAuth, collectFaceAuth } from '../api/face-auth-api'

interface OwnProps {
  isActive: boolean
  type: string
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

const WebcamCaptureComponent: React.FC<OwnProps> = (props: OwnProps) => {
  const { isActive, type } = props
  const [imageSrc, setImageSrc] = useState('')
  const [webcam, setWebcam] = useState()
  const [isFaceSearch, setIsFaceSearch] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [userID, setUserID] = useState('')
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
  const onUpload = () => {
    const b64 = imageSrc.split(',')
    collectFaceAuth({
      userID: userID,
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
    if (faceDetect === 'alert') {
      setAlertMessage('カメラに近づいてください。')
    } else if (faceDetect !== '') {
      const face = webcam.getScreenshot()
      setImageSrc(face)
      setIsFaceSearch(false)
      setAlertMessage('')
      switch (type) {
        case 'auth':
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
          break

        case 'upload':
          setAlertMessage('顔登録しますか？')
          break
      }
      return
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
        <img src={imageSrc} alt="" />
      </div>
      <div>
        UserID:{' '}
        <Input value={userID} onChange={e => setUserID(e.target.value)} />
      </div>
      <div>
        <IconButton color="primary" onClick={onUpload}>
          登録
        </IconButton>
      </div>
    </React.Fragment>
  )
}

export default WebcamCaptureComponent
