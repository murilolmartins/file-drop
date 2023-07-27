import { ReactNode } from 'react'

import { useDropFile } from './hooks/useDropFile'

interface FileUploadAreaProps {
  children: ReactNode
}

const FileUploadArea = ({ children }: FileUploadAreaProps) => {
  const { handleDrop, handleDragOver } = useDropFile()

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="drag-area">
      {children}
    </div>
  )
}

export default FileUploadArea
