import { ReactNode } from 'react'

import { useDropFile } from './hooks/useDropFile'

interface S3FileUploadAreaProps {
  children: ReactNode
}

const S3FileUploadArea = ({ children }: S3FileUploadAreaProps) => {
  const { handleDrop, handleDragOver } = useDropFile()

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="drag-area">
      {children}
    </div>
  )
}

export default S3FileUploadArea
