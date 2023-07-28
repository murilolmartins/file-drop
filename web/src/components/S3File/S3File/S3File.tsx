import type {
  DeleteS3FileMutationVariables,
  FindS3FileById,
} from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_S3_FILE_MUTATION = gql`
  mutation DeleteS3FileMutation($id: Int!) {
    deleteS3File(id: $id) {
      id
    }
  }
`

interface Props {
  s3File: NonNullable<FindS3FileById['s3File']>
}

const S3File = ({ s3File }: Props) => {
  const [deleteS3File] = useMutation(DELETE_S3_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('S3File deleted')
      navigate(routes.s3Files())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteS3FileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete s3File ' + id + '?')) {
      deleteS3File({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            S3File {s3File.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{s3File.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{s3File.name}</td>
            </tr>
            <tr>
              <th>Pre signed url</th>
              <td>{s3File.preSignedUrl}</td>
            </tr>
            <tr>
              <th>Path</th>
              <td>{s3File.path}</td>
            </tr>
            <tr>
              <th>Bucket name</th>
              <td>{s3File.bucketName}</td>
            </tr>
            <tr>
              <th>Mime type</th>
              <td>{s3File.mimeType}</td>
            </tr>
            <tr>
              <th>Version</th>
              <td>{s3File.version}</td>
            </tr>
            <tr>
              <th>Version id</th>
              <td>{s3File.versionId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(s3File.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(s3File.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(s3File.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default S3File
