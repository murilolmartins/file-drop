import { connectionAPIGet } from 'src/utils/connection/api'

interface GetPresignedUrlResponse {
  data: {
    preSignedUrl: string
    path: string
  }
}

export const getPresignedUrl = async (fileName: string, userId: number) => {
  const {
    data: { preSignedUrl, path },
  } = await connectionAPIGet<GetPresignedUrlResponse>(
    `/.redwood/functions/getFilePresignedUrl?fileName=${fileName}&userId=${userId}`
  )

  return { preSignedUrl, path }
}
