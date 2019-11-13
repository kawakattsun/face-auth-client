import React, { useState, useEffect } from 'react'
import { loadExpressionModels } from '../lib/face-api-control'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { WebcamCapture } from './webcam-capture-component'

const App: React.FC = () => {
  const [isActiveWebcamCapture, SetIsActiveWebcamCapture] = useState(false)
  useEffect(() => {
    loadExpressionModels()
  }, [])
  const toggleIsActiveWebcamCapture = () => {
    SetIsActiveWebcamCapture(!isActiveWebcamCapture)
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5">
          ファイルアップロード
        </Typography>
        <Button onClick={toggleIsActiveWebcamCapture}>
          {isActiveWebcamCapture ? 'Stop web camera.' : 'Start web camera.'}
        </Button>
        <WebcamCapture isActive={isActiveWebcamCapture} />
      </Container>
    </React.Fragment>
  )
}

export default App
