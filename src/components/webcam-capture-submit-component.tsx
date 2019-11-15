import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

interface OwnProps {
  userID: string
  handleChageUserID: Function
  onUpload: Function
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const WebcamCaptureSubmitComponent: React.FC<OwnProps> = ({
  userID,
  handleChageUserID,
  onUpload
}: OwnProps) => {
  const classes = useStyles()

  return (
    <div>
      <div>
        UserID:{' '}
        <Input value={userID} onChange={event => handleChageUserID(event)} />
      </div>
      <div>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => onUpload()}
        >
          登録
        </Button>
      </div>
    </div>
  )
}

export default WebcamCaptureSubmitComponent
