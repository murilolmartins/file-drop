import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import S3FileForm from 'src/components/S3File/S3FileForm'

import type { CreateS3FileInput } from 'types/graphql'

const CREATE_S3_FILE_MUTATION = gql`
  mutation CreateS3FileMutation($input: CreateS3FileInput!) {
    createS3File(input: $input) {
      id
    }
  }
`

const NewS3File = () => {
  const [createS3File, { loading, error }] = useMutation(
    CREATE_S3_FILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('S3File created')
        navigate(routes.s3Files())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateS3FileInput) => {
    createS3File({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New S3File</h2>
      </header>
      <div className="rw-segment-main">
        <S3FileForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewS3File
