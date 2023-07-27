import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditS3FileById, UpdateS3FileInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormS3File = NonNullable<EditS3FileById['s3File']>

interface S3FileFormProps {
  s3File?: EditS3FileById['s3File']
  onSave: (data: UpdateS3FileInput, id?: FormS3File['id']) => void
  error: RWGqlError
  loading: boolean
}

const S3FileForm = (props: S3FileFormProps) => {
  const onSubmit = (data: FormS3File) => {
    props.onSave(data, props?.s3File?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormS3File> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.s3File?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="preSignedUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pre signed url
        </Label>

        <TextField
          name="preSignedUrl"
          defaultValue={props.s3File?.preSignedUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="preSignedUrl" className="rw-field-error" />

        <Label
          name="path"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Path
        </Label>

        <TextField
          name="path"
          defaultValue={props.s3File?.path}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="path" className="rw-field-error" />

        <Label
          name="bucketName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bucket name
        </Label>

        <TextField
          name="bucketName"
          defaultValue={props.s3File?.bucketName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="bucketName" className="rw-field-error" />

        <Label
          name="mimeType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mime type
        </Label>

        <TextField
          name="mimeType"
          defaultValue={props.s3File?.mimeType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="mimeType" className="rw-field-error" />

        <Label
          name="version"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Version
        </Label>

        <NumberField
          name="version"
          defaultValue={props.s3File?.version}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="version" className="rw-field-error" />

        <Label
          name="versionId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Version id
        </Label>

        <TextField
          name="versionId"
          defaultValue={props.s3File?.versionId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="versionId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default S3FileForm
