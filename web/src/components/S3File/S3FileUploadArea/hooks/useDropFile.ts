import { DragEvent } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { checkAndUploadFile } from 'src/integrations/s3/checkFileAndUpload'

import { QUERY } from '../../S3FilesCell'

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
    }
  }
`

export const useDropFile = () => {
  const [createFile] = useMutation(CREATE_FILE_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    try {
      event.preventDefault()
      const { files } = event.dataTransfer

      if (files.length > 0) {
        toast.loading('Uploading file...', { id: 'uploading' })

        const [file] = files as FileList

        const response = await checkAndUploadFile(file.name, file)

        if (!response) {
          toast.remove('uploading')
          toast('File already exists.')
          return
        }

        console.log('response', response.fileUrlWithVersionId)

        await createFile({
          variables: {
            input: {
              name: file.name,
              mimeType: file.type,
              bucketName: process.env.FILES_BUCKET,
              path: response.path,
              preSignedUrl: response.fileUrlWithVersionId,
            },
          },
        })

        toast.remove('uploading')
        toast.success('File uploaded successfully.')
      }
    } catch (error) {
      console.error(error)
      toast.remove('uploading')
      toast.error('Error uploading file.')
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  return {
    handleDrop,
    handleDragOver,
  }
}
