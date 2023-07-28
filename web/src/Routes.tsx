// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import S3FilesLayout from './layouts/S3FilesLayout/S3FilesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={S3FilesLayout}>
        <Route path="/s3-files" page={S3FileS3FilesPage} name="s3Files" />
      </Set>
      <Set wrap={ScaffoldLayout} title="S3File" titleTo="s3Files" buttonLabel="Return" buttonTo="s3Files">
        <Route path="/s3-files/{id:Int}" page={S3FileS3FilePage} name="s3File" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
