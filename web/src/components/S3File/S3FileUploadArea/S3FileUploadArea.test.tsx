import { render } from '@redwoodjs/testing/web'

import S3FileUploadArea from './S3FileUploadArea'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileUploadArea', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<S3FileUploadArea>Drop Area</S3FileUploadArea>)
    }).not.toThrow()
  })
})
