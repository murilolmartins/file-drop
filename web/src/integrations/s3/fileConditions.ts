import { toast } from '@redwoodjs/web/dist/toast'

export const FILE_SIZE_LIMIT = 50000000 // 10MB

const FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'text/plain',
  'text/csv',
]

export const checkFile = (file: File) => {
  if (file.size > FILE_SIZE_LIMIT) {
    toast.error('File is too large.')
    throw new Error('File is too large.')
  }

  if (!FILE_TYPES.includes(file.type)) {
    toast.error('File type not supported.')
    throw new Error('File type not supported.')
  }
}
