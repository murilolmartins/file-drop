import S3FileCell from 'src/components/S3File/S3FileCell'

type S3FilePageProps = {
  id: number
}

const S3FilePage = ({ id }: S3FilePageProps) => {
  return <S3FileCell id={id} />
}

export default S3FilePage
