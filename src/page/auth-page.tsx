import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CommonPageTitleComponent from '../components/common/page-title-component'
import WebcamButtonComponent from '../components/webcam-button-component'
import WebcamCaptureComponent from '../components/webcam-capture-component'

const AuthPage: React.FC = () => {
  const [isActiveWebcamCapture, SetIsActiveWebcamCapture] = useState(false)
  const toggleIsActiveWebcamCapture = () => {
    SetIsActiveWebcamCapture(!isActiveWebcamCapture)
  }

  return (
    <Container component="main" maxWidth={false}>
      <CommonPageTitleComponent title="Face Auth" />
      <WebcamButtonComponent
        isActive={isActiveWebcamCapture}
        toggleAction={toggleIsActiveWebcamCapture}
      />
      <WebcamCaptureComponent isActive={isActiveWebcamCapture} type="auth" />
    </Container>
  )
}

export default AuthPage
