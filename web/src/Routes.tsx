// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from './auth'
import S3FilesLayout from './layouts/S3FilesLayout/S3FilesLayout'
import ScaffoldLayout from './layouts/ScaffoldLayout/ScaffoldLayout'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import S3FilePage from './pages/S3File/S3FilePage/S3FilePage'
import S3FilesPage from './pages/S3File/S3FilesPage/S3FilesPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login">
        <Set wrap={S3FilesLayout}>
          <Route path="/s3-files" page={S3FilesPage} name="s3Files" />
        </Set>
        <Set wrap={ScaffoldLayout} title="S3File" titleTo="s3Files" buttonLabel="Return" buttonTo="s3Files">
          <Route path="/s3-files/{id:Int}" page={S3FilePage} name="s3File" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
