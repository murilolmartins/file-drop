import type { FindS3FileById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import S3File from 'src/components/S3File/S3File'

export const QUERY = gql`
  query FindS3FileById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>S3File not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ s3File }: CellSuccessProps<FindS3FileById>) => {
  return <S3File s3File={s3File} />
}
