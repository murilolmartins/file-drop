/* eslint-disable @typescript-eslint/ban-ts-comment */
import AWS from 'aws-sdk'

import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './getFilePresignedUrl'

const getSignedUrlPromise = jest.fn()

// @ts-ignore
AWS.S3 = jest.fn().mockImplementation(() => ({
  getSignedUrlPromise,
}))

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('getFilePresignedUrl function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        fileName: 'README.txt', // Add parameters here
      },
    })

    getSignedUrlPromise.mockResolvedValueOnce('url')

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)

    console.log(data)

    expect(response.statusCode).toBe(200)
    expect(data.path).toBe('files/README.txt')
    expect(data.preSignedUrl).toBe('url')
  })

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})
