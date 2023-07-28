import { render } from '@redwoodjs/testing/web'

import S3FilesLayout from './S3FilesLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('S3FilesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<S3FilesLayout />)
    }).not.toThrow()
  })
})
