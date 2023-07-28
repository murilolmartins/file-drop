import { Toaster } from '@redwoodjs/web/dist/toast'

type S3FilesLayoutProps = {
  children?: React.ReactNode
}

const S3FilesLayout = ({ children }: S3FilesLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header s3-files-header">
        <h1>DRAG AND DROP FILES</h1>
        <h2>
          Drag and drop your file into the container to store it in the S3
          Bucket
        </h2>
        <span className="s3-files-conditions">
          <p>File types: txt, png, jpg, jpeg, csv and pdf</p>
          <p>Max size: 5MB</p>
        </span>
      </header>
      <main className="rw-main s3-files-main">{children}</main>
    </div>
  )
}

export default S3FilesLayout
