import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { loadExpressionModels } from './lib/face-api-control'
import CommonHeaderComponent from './components/common/header-component'
import AuthPage from './page/auth-page'
import IndexPage from './page/index-page'
import UploadPage from './page/upload-page'

const App: React.FC = () => {
  useEffect(() => {
    loadExpressionModels()
  }, [])

  return (
    <Router>
      <CssBaseline />
      <CommonHeaderComponent />
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Route path="/upload" exact>
          <UploadPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
