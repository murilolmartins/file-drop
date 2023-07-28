import { connectionAPIGet } from 'src/utils/connection/api'

interface GetFileContentResponse {
  data: {
    fileContent: {
      type: 'Buffer'
      data: number[]
    }
    versionId: string
  }
}

export async function getFileContent(fileName: string, userId: number) {
  const {
    data: { fileContent, versionId },
  } = await connectionAPIGet<GetFileContentResponse>(
    `/.redwood/functions/getFileContent?fileName=${fileName}&userId=${userId}`
  )

  return { fileContent, versionId }
}
