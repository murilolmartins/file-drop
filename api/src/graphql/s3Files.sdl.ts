export const schema = gql`
  type S3File {
    id: Int!
    name: String!
    preSignedUrl: String!
    path: String!
    bucketName: String!
    mimeType: String!
    version: Int!
    versionId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    s3Files: [S3File!]! @requireAuth
    s3File(id: Int!): S3File @requireAuth
  }

  input CreateS3FileInput {
    name: String!
    preSignedUrl: String!
    path: String!
    bucketName: String!
    mimeType: String!
    version: Int!
    versionId: String!
  }

  input UpdateS3FileInput {
    name: String
    preSignedUrl: String
    path: String
    bucketName: String
    mimeType: String
    version: Int
    versionId: String
  }

  type Mutation {
    createS3File(input: CreateS3FileInput!): S3File! @requireAuth
    updateS3File(id: Int!, input: UpdateS3FileInput!): S3File! @requireAuth
    deleteS3File(id: Int!): S3File! @requireAuth
  }
`
