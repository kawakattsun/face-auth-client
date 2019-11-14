import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

interface OwnProps {
  isActive: boolean
  toggleAction: Function
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const WebcamButtonComponent: React.FC<OwnProps> = ({
  isActive,
  toggleAction
}: OwnProps) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={() => toggleAction()}
    >
      {isActive ? 'Stop web camera' : 'Start web camera'}
    </Button>
  )
}

export default WebcamButtonComponent
