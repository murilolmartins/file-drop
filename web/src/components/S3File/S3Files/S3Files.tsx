import { Button, List } from 'antd'
import {
  AiOutlineFilePdf,
  AiOutlineFileJpg,
  AiOutlineFileText,
  AiOutlineFileUnknown,
} from 'react-icons/ai'
import { BsFiletypePng, BsFiletypeCsv } from 'react-icons/bs'
import { SiJpeg } from 'react-icons/si'
import type { DeleteS3FileMutationVariables, FindS3Files } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/S3File/S3FilesCell'
import { timeTag } from 'src/lib/formatters'
import { downloadFileFromUrl } from 'src/utils/downloadFileFromUrl'

import S3FileUploadArea from '../S3FileUploadArea/S3FileUploadArea'

const DELETE_S3_FILE_MUTATION = gql`
  mutation DeleteS3FileMutation($id: Int!) {
    deleteS3File(id: $id) {
      id
    }
  }
`

const S3FileIconMap = (mimeType: string) => {
  switch (mimeType) {
    case 'application/pdf':
      return <AiOutlineFilePdf size={30} />
    case 'text/plain':
      return <AiOutlineFileText size={30} />
    case 'image/png':
      return <BsFiletypePng size={30} />
    case 'image/jpeg':
      return <SiJpeg size={30} />
    case 'image/jpg':
      return <AiOutlineFileJpg size={30} />
    case 'text/csv':
      return <BsFiletypeCsv size={30} />
    default:
      return <AiOutlineFileUnknown size={30} />
  }
}

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
    <S3FileUploadArea>
      <List
        itemLayout="horizontal"
        style={{
          width: '100%',
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
              avatar={S3FileIconMap(file.mimeType)}
              title={file.name}
              description={
                <p>
                  Version: {file.version} | Uploaded at:{' '}
                  {timeTag(file.createdAt)}
                </p>
              }
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <nav className="rw-table-actions">
              <Link
                to={routes.s3File({ id: file.id })}
                className="rw-button rw-button-green"
              >
                Details
              </Link>
              <Button
                type="primary"
                onClick={() =>
                  downloadFileFromUrl(file.preSignedUrl, file.name)
                }
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
    </S3FileUploadArea>
  )
}

export default S3FilesList
