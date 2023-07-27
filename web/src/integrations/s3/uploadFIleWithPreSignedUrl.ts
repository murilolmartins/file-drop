import { connectionAPIPut } from 'src/utils/connection/api'

export const uploadFileWithPreSignedUrl = async (
  preSignedUrl: string,
  file: File
) => {
  await connectionAPIPut(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
