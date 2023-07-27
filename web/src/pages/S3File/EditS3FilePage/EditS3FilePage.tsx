import EditS3FileCell from 'src/components/S3File/EditS3FileCell'

type S3FilePageProps = {
  id: number
}

const EditS3FilePage = ({ id }: S3FilePageProps) => {
  return <EditS3FileCell id={id} />
}

export default EditS3FilePage
