// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FileUploadArea> = (args) => {
//   return <FileUploadArea {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import S3FileUploadArea from './S3FileUploadArea'

export const generated = () => {
  return <S3FileUploadArea>Drop Area</S3FileUploadArea>
}

export default {
  title: 'Components/FileUploadArea',
  component: S3FileUploadArea,
} as ComponentMeta<typeof S3FileUploadArea>
