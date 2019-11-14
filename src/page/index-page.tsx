import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CommonPageTitleComponent from '../components/common/page-title-component'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginRight: theme.spacing(2),
      width: '20%'
    }
  })
)

const IndexPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container component="main" maxWidth={false}>
      <CommonPageTitleComponent title="Face Auth Index" />
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem onClick={() => history.push('/auth')}>
            <ArrowForwardIosIcon color="action" fontSize="small" />
            Face Auth
          </MenuItem>
          <MenuItem onClick={() => history.push('/upload')}>
            <ArrowForwardIosIcon color="action" fontSize="small" />
            Face Auth Upload
          </MenuItem>
        </MenuList>
      </Paper>
    </Container>
  )
}

export default IndexPage
