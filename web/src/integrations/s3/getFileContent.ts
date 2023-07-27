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

export async function getFileContent(fileName: string) {
  const {
    data: { fileContent, versionId },
  } = await connectionAPIGet<GetFileContentResponse>(
    `/.redwood/functions/getFileContent?fileName=${fileName}`
  )

  return { fileContent, versionId }
}
