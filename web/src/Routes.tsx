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

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="S3Files" titleTo="s3Files" buttonLabel="New S3File" buttonTo="newS3File">
        <Route path="/s3-files/new" page={S3FileNewS3FilePage} name="newS3File" />
        <Route path="/s3-files/{id:Int}/edit" page={S3FileEditS3FilePage} name="editS3File" />
        <Route path="/s3-files/{id:Int}" page={S3FileS3FilePage} name="s3File" />
        <Route path="/s3-files" page={S3FileS3FilesPage} name="s3Files" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
