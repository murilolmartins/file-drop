import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/S3File/S3FilesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteS3FileMutationVariables, FindS3Files } from 'types/graphql'

const DELETE_S3_FILE_MUTATION = gql`
  mutation DeleteS3FileMutation($id: Int!) {
    deleteS3File(id: $id) {
      id
    }
  }
`

const S3FilesList = ({ s3Files }: FindS3Files) => {
  const [deleteS3File] = useMutation(DELETE_S3_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('S3File deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteS3FileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete s3File ' + id + '?')) {
      deleteS3File({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Pre signed url</th>
            <th>Path</th>
            <th>Bucket name</th>
            <th>Mime type</th>
            <th>Version</th>
            <th>Version id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {s3Files.map((s3File) => (
            <tr key={s3File.id}>
              <td>{truncate(s3File.id)}</td>
              <td>{truncate(s3File.name)}</td>
              <td>{truncate(s3File.preSignedUrl)}</td>
              <td>{truncate(s3File.path)}</td>
              <td>{truncate(s3File.bucketName)}</td>
              <td>{truncate(s3File.mimeType)}</td>
              <td>{truncate(s3File.version)}</td>
              <td>{truncate(s3File.versionId)}</td>
              <td>{timeTag(s3File.createdAt)}</td>
              <td>{timeTag(s3File.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.s3File({ id: s3File.id })}
                    title={'Show s3File ' + s3File.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editS3File({ id: s3File.id })}
                    title={'Edit s3File ' + s3File.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete s3File ' + s3File.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(s3File.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default S3FilesList
