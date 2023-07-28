import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { s3 } from 'src/lib/s3Client'

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
  logger.info(`${event.httpMethod} ${event.path}: getFileContentHash function`)

  try {
    const { fileName } = event.queryStringParameters

    const params = {
      Bucket: process.env.FILES_BUCKET,
      Key: `files/${fileName}`,
    }

    const response = await s3.getObject(params).promise()

    const fileContent = response.Body

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { fileContent, versionId: response.VersionId },
      }),
    }
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      return {
        statusCode: 202,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { fileContent: null },
        }),
      }
    }
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { fileContent: null },
      }),
    }
  }
}
