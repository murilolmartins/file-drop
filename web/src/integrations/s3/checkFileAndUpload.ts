import { compareFileContentWithBuffer } from 'src/utils/compareFileContentWithBuffer'

import { getFileContent } from './getFileContent'
import { getPresignedUrl } from './getPresignedUrl'
import { uploadFileWithPreSignedUrl } from './uploadFIleWithPreSignedUrl'

export async function checkAndUploadFile(
  fileName: string,
  newFileContent: File
) {
  const { fileContent } = await getFileContent(fileName)

  if (fileContent) {
    console.log('fileContent', fileContent)
    const isSameFile = await compareFileContentWithBuffer(
      fileContent,
      newFileContent
    )
    if (isSameFile) return null
  }
  const { preSignedUrl, path } = await getPresignedUrl(fileName)

  await uploadFileWithPreSignedUrl(preSignedUrl, newFileContent)

  const { versionId } = await getFileContent(fileName)

  const fileUrl = preSignedUrl.split('?')[0]

  const fileUrlWithVersionId = `${fileUrl}?versionId=${versionId}`

  return { fileUrlWithVersionId, path, versionId }
}
