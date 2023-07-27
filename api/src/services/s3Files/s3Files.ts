import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const s3Files: QueryResolvers['s3Files'] = () => {
  return db.s3File.findMany()
}

export const s3File: QueryResolvers['s3File'] = ({ id }) => {
  return db.s3File.findUnique({
    where: { id },
  })
}

export const createS3File: MutationResolvers['createS3File'] = ({ input }) => {
  return db.s3File.create({
    data: input,
  })
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

export const deleteS3File: MutationResolvers['deleteS3File'] = ({ id }) => {
  return db.s3File.delete({
    where: { id },
  })
}
