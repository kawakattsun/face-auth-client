import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import WebcamButtonComponent from '../components/webcam-button-component'
import WebcamCaptureComponent from '../components/webcam-capture-component'
import CommonPageTitleComponent from '../components/common/page-title-component'

const UploadPage: React.FC = () => {
  const [isActiveWebcamCapture, SetIsActiveWebcamCapture] = useState(false)
  const toggleIsActiveWebcamCapture = () => {
    SetIsActiveWebcamCapture(!isActiveWebcamCapture)
  }

  return (
    <Container component="main" maxWidth={false}>
      <CommonPageTitleComponent title="Upload Face" />
      <WebcamButtonComponent
        isActive={isActiveWebcamCapture}
        toggleAction={toggleIsActiveWebcamCapture}
      />
      <WebcamCaptureComponent isActive={isActiveWebcamCapture} type="upload" />
    </Container>
  )
}

export default UploadPage
