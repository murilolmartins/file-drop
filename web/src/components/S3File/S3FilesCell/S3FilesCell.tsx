import type { FindS3Files } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import S3Files from 'src/components/S3File/S3Files'

export const QUERY = gql`
  query FindS3Files {
    s3Files {
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

export const Success = ({ s3Files }: CellSuccessProps<FindS3Files>) => {
  return <S3Files s3Files={s3Files} />
}
