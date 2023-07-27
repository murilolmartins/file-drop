export async function compareFileContentWithBuffer(
  fileContent: { type: 'Buffer'; data: number[] },
  file: File
) {
  if (fileContent.data.length !== file.size) {
    return false
  }

  const fileArrayBuffer = await file.arrayBuffer()

  const fileArray = new Uint8Array(fileArrayBuffer)

  for (let i = 0; i < fileContent.data.length; i++) {
    if (fileContent.data[i] !== fileArray[i]) {
      return false
    }
  }
  return true
}
