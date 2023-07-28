import { compareFileContentWithBuffer } from 'src/utils/compareFileContentWithBuffer'

import { getFileContent } from './getFileContent'
import { getPresignedUrl } from './getPresignedUrl'
import { uploadFileWithPreSignedUrl } from './uploadFIleWithPreSignedUrl'

export async function checkAndUploadFile(
  fileName: string,
  newFileContent: File,
  userId: number
) {
  const { fileContent } = await getFileContent(fileName, userId)

  if (fileContent) {
    console.log('fileContent', fileContent)
    const isSameFile = await compareFileContentWithBuffer(
      fileContent,
      newFileContent
    )
    if (isSameFile) return null
  }
  const { preSignedUrl, path } = await getPresignedUrl(fileName, userId)

  await uploadFileWithPreSignedUrl(preSignedUrl, newFileContent)

  const { versionId } = await getFileContent(fileName, userId)

  const fileUrl = preSignedUrl.split('?')[0]

  const fileUrlWithVersionId = `${fileUrl}?versionId=${versionId}`

  return { fileUrlWithVersionId, path, versionId }
}
