import { Toaster } from '@redwoodjs/web/dist/toast'

type S3FilesLayoutProps = {
  children?: React.ReactNode
}

const S3FilesLayout = ({ children }: S3FilesLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header s3-files-header">
        <h1 className="rw-heading rw-heading-primary">DRAG AND DROP FILES</h1>
        <p>
          Drag and drop your file into the container to store it in the S3
          Bucket
        </p>
      </header>
      <main className="rw-main s3-files-main">{children}</main>
    </div>
  )
}

export default S3FilesLayout
