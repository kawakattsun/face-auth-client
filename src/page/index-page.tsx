import React from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const IndexPage: React.FC = () => {
  const history = useHistory()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5">
          Face Auth Index
        </Typography>
        <IconButton color="primary" onClick={() => history.push('/auth')}>
          認証
        </IconButton>
        <IconButton color="primary" onClick={() => history.push('/upload')}>
          登録
        </IconButton>
      </Container>
    </React.Fragment>
  )
}

export default IndexPage
