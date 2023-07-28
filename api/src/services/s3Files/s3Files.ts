import AWS from 'aws-sdk'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
})

export const s3Files: QueryResolvers['s3Files'] = () => {
  return db.s3File.findMany({ orderBy: { createdAt: 'desc' } })
}

export const s3File: QueryResolvers['s3File'] = ({ id }) => {
  return db.s3File.findUnique({
    where: { id },
  })
}

export const createS3File: MutationResolvers['createS3File'] = async ({
  input,
}) => {
  const files = await db.s3File.findMany({ where: { name: input.name } })

  const version = files.length + 1

  logger.info('version', version)

  const data = {
    data: {
      ...input,
      version,
    },
  }

  return await db.s3File.create(data)
}

export const updateS3File: MutationResolvers['updateS3File'] = ({
  id,
  input,
}) => {
  return db.s3File.update({
    data: input,
    where: { id },
  })
}

export const deleteS3File: MutationResolvers['deleteS3File'] = async ({
  id,
}) => {
  const fileObj = await s3File({ id })

  if (!fileObj) {
    throw new Error('File not found')
  }

  const params = {
    Bucket: process.env.FILES_BUCKET,
    Key: fileObj.path,
    VersionId: fileObj.versionId,
  }

  const result = await s3.deleteObject(params).promise()

  if (result.$response.error) {
    throw new Error('Error deleting file')
  }

  return await db.s3File.delete({
    where: { id },
  })
}
