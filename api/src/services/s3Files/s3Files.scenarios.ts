import type { Prisma, S3File } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.S3FileCreateArgs>({
  s3File: {
    one: {
      data: {
        name: 'String',
        preSignedUrl: 'String4079583',
        path: 'String',
        bucketName: 'String',
        mimeType: 'String',
        versionId: 'String9017344',
        updatedAt: '2023-07-27T20:33:27.597Z',
        user: {
          create: {
            id: 6416068,
            email: 'String',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            resetToken: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        preSignedUrl: 'String6224680',
        path: 'String',
        bucketName: 'String',
        mimeType: 'String',
        versionId: 'String9691793',
        updatedAt: '2023-07-27T20:33:27.597Z',
        user: {
          create: {
            id: 6416068,
            email: 'String',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            resetToken: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<S3File, 's3File'>
