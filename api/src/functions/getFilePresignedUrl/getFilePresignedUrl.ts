import type { APIGatewayEvent, Context } from 'aws-lambda'
import AWS from 'aws-sdk'

import { logger } from 'src/lib/logger'
// import { s3 } from 'src/lib/s3Client'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: getFilePresignedUrl function`)

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })

  const { fileName } = event.queryStringParameters

  const path = `files/${fileName}`

  const params = {
    Bucket: process.env.FILES_BUCKET,
    Key: path,
    Expires: 60,
  }

  const preSignedUrl = await s3.getSignedUrlPromise('putObject', params)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { preSignedUrl, path },
    }),
  }
}
