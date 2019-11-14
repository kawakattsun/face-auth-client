import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import WebcamCaptureComponent from '../components/webcam-capture-component'

const AuthPage: React.FC = () => {
  const [isActiveWebcamCapture, SetIsActiveWebcamCapture] = useState(false)
  const toggleIsActiveWebcamCapture = () => {
    SetIsActiveWebcamCapture(!isActiveWebcamCapture)
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5">
          Face Auth
        </Typography>
        <Button onClick={toggleIsActiveWebcamCapture}>
          {isActiveWebcamCapture ? 'Stop web camera.' : 'Start web camera.'}
        </Button>
        <WebcamCaptureComponent isActive={isActiveWebcamCapture} type="auth" />
      </Container>
    </React.Fragment>
  )
}

export default AuthPage
