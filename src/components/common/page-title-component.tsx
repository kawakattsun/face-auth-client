import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

interface OwnProps {
  title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
)

const CommonPageTitleComponent: React.FC<OwnProps> = ({ title }: OwnProps) => {
  const classes = useStyles()

  return (
    <Typography className={classes.head} component="h1" variant="h3">
      {title}
    </Typography>
  )
}

export default CommonPageTitleComponent
