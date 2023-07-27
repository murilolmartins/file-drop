import type { EditS3FileById, UpdateS3FileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import S3FileForm from 'src/components/S3File/S3FileForm'

export const QUERY = gql`
  query EditS3FileById($id: Int!) {
    s3File: s3File(id: $id) {
      id
      name
      preSignedUrl
      path
      bucketName
      mimeType
      version
      versionId
      createdAt
      updatedAt
    }
  }
`
const UPDATE_S3_FILE_MUTATION = gql`
  mutation UpdateS3FileMutation($id: Int!, $input: UpdateS3FileInput!) {
    updateS3File(id: $id, input: $input) {
      id
      name
      preSignedUrl
      path
      bucketName
      mimeType
      version
      versionId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ s3File }: CellSuccessProps<EditS3FileById>) => {
  const [updateS3File, { loading, error }] = useMutation(
    UPDATE_S3_FILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('S3File updated')
        navigate(routes.s3Files())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateS3FileInput,
    id: EditS3FileById['s3File']['id']
  ) => {
    updateS3File({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit S3File {s3File?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <S3FileForm
          s3File={s3File}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
