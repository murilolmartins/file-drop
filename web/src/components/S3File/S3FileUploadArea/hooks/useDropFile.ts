import { DragEvent } from 'react'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { checkAndUploadFile } from 'src/integrations/s3/checkFileAndUpload'
import { checkFile } from 'src/integrations/s3/fileConditions'

import { QUERY } from '../../S3FilesCell'

const CREATE_S3_FILE_MUTATION = gql`
  mutation CreateS3FileMutation($input: CreateS3FileInput!) {
    createS3File(input: $input) {
      id
    }
  }
`

export const useDropFile = () => {
  const [createS3File] = useMutation(CREATE_S3_FILE_MUTATION, {
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

        checkFile(file)

        const response = await checkAndUploadFile(file.name, file)

        if (!response) {
          toast.remove('uploading')
          toast('File already exists.')
          return
        }

        await createS3File({
          variables: {
            input: {
              name: file.name,
              mimeType: file.type,
              bucketName: process.env.FILES_BUCKET,
              path: response.path,
              preSignedUrl: response.fileUrlWithVersionId,
              versionId: response.versionId,
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
