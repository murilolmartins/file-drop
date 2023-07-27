import type { S3File } from '@prisma/client'

import {
  s3Files,
  s3File,
  createS3File,
  updateS3File,
  deleteS3File,
} from './s3Files'
import type { StandardScenario } from './s3Files.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('s3Files', () => {
  scenario('returns all s3Files', async (scenario: StandardScenario) => {
    const result = await s3Files()

    expect(result.length).toEqual(Object.keys(scenario.s3File).length)
  })

  scenario('returns a single s3File', async (scenario: StandardScenario) => {
    const result = await s3File({ id: scenario.s3File.one.id })

    expect(result).toEqual(scenario.s3File.one)
  })

  scenario('creates a s3File', async () => {
    const result = await createS3File({
      input: {
        name: 'String',
        preSignedUrl: 'String5587339',
        path: 'String',
        bucketName: 'String',
        mimeType: 'String',
        versionId: 'String6135062',
        updatedAt: '2023-07-27T20:33:27.585Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.preSignedUrl).toEqual('String5587339')
    expect(result.path).toEqual('String')
    expect(result.bucketName).toEqual('String')
    expect(result.mimeType).toEqual('String')
    expect(result.versionId).toEqual('String6135062')
    expect(result.updatedAt).toEqual(new Date('2023-07-27T20:33:27.585Z'))
  })

  scenario('updates a s3File', async (scenario: StandardScenario) => {
    const original = (await s3File({ id: scenario.s3File.one.id })) as S3File
    const result = await updateS3File({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a s3File', async (scenario: StandardScenario) => {
    const original = (await deleteS3File({
      id: scenario.s3File.one.id,
    })) as S3File
    const result = await s3File({ id: original.id })

    expect(result).toEqual(null)
  })
})
