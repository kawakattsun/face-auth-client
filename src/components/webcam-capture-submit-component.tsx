import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'

interface OwnProps {
  userID: string
  handleChageUserID: Function
  onUpload: Function
}

const WebcamCaptureSubmitComponent: React.FC<OwnProps> = ({
  userID,
  handleChageUserID,
  onUpload
}: OwnProps) => {
  return (
    <div>
      <div>
        UserID:{' '}
        <Input value={userID} onChange={event => handleChageUserID(event)} />
      </div>
      <div>
        <IconButton color="primary" onClick={() => onUpload()}>
          登録
        </IconButton>
      </div>
    </div>
  )
}

export default WebcamCaptureSubmitComponent
