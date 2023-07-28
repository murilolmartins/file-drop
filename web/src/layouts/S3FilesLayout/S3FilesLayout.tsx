import { Button } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

type S3FilesLayoutProps = {
  children?: React.ReactNode
}

const S3FilesLayout = ({ children }: S3FilesLayoutProps) => {
  const { currentUser, logOut } = useAuth()
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.s3Files()} className="rw-link">
            S3Files
          </Link>
        </h1>
        <Button
          onClick={logOut}
          className="rw-button rw-button-green"
          style={{ height: '24px' }}
        >
          Logout
        </Button>
      </header>
      <section className="rw-header s3-files-header">
        <h1>DRAG AND DROP FILES</h1>
        <h2 className="rw-heading rw-heading-primary">
          {currentUser.name}, drag and drop your file into the container to
          store it in the S3 Bucket
        </h2>
        <span className="s3-files-conditions">
          <p className="rw-text">
            File types: txt, png, jpg, jpeg, csv and pdf
          </p>
          <p className="rw-text">Maximum size: 5MB</p>
        </span>
      </section>
      <main className="rw-main s3-files-main">{children}</main>
    </div>
  )
}

export default S3FilesLayout
