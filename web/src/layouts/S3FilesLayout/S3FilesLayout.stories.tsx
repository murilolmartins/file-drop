import type { ComponentMeta, ComponentStory } from '@storybook/react'

import S3FileLayout from './S3FilesLayout'

export const generated: ComponentStory<typeof S3FileLayout> = (args) => {
  return <S3FileLayout {...args} />
}

export default {
  title: 'Layouts/S3FileLayout',
  component: S3FileLayout,
} as ComponentMeta<typeof S3FileLayout>
