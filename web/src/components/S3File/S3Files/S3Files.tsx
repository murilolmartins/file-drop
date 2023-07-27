import { Button, List } from 'antd'
import { AiOutlineFilePdf } from 'react-icons/ai'
import type { DeleteS3FileMutationVariables, FindS3Files } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/S3File/S3FilesCell'

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
    <List
      itemLayout="horizontal"
      style={{
        width: '90%',
        border: '3px solid #eee',
        padding: '0px 10px',
        minHeight: '80vh',
        borderRadius: '10px',
        overflowY: 'scroll',
      }}
      dataSource={s3Files}
      renderItem={(file) => (
        <List.Item
          style={{
            padding: '20px',
            border: '1px solid #eee',
            borderRadius: '10px',
            margin: '10px 0px',
            boxShadow: '0px 0px 10px 0px #eee',
          }}
        >
          <List.Item.Meta
            avatar={<AiOutlineFilePdf size={30} />}
            title={<a href="https://ant.design">{file.name}</a>}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <nav className="rw-table-actions">
            <Button
              type="primary"
              href={file.preSignedUrl}
              target="_blank"
              title={'Show file ' + file.id + ' detail'}
              rel="noreferrer"
            >
              Download
            </Button>
            <Button
              type="primary"
              danger
              title={'Delete file ' + file.id}
              onClick={() => onDeleteClick(file.id)}
            >
              Delete
            </Button>
          </nav>
        </List.Item>
      )}
    />
  )
}

export default S3FilesList
