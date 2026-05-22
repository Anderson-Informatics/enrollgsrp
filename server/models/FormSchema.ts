import type { Document } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export type FieldType
  = | 'text'
    | 'number'
    | 'email'
    | 'phone'
    | 'date'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'file'
    | 'address'
    | 'ssn'

export type ValidationType = 'required' | 'min' | 'max' | 'pattern' | 'minLength' | 'maxLength' | 'custom'

export interface IValidation {
  type: ValidationType
  value?: string | number
  message?: string
}

export interface IConditionalLogic {
  fieldId: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than'
  value: string | number | boolean
  action: 'show' | 'hide' | 'require' | 'optional'
}

export interface IFormField {
  id: string
  type: FieldType
  label: string
  description?: string
  placeholder?: string
  defaultValue?: string | number | boolean | string[]
  options?: Array<{ value: string, label: string }>
  validations: IValidation[]
  conditionalLogic?: IConditionalLogic[]
  order: number
  isRequired: boolean
  metadata?: Record<string, unknown>
}

export interface IFormSchema extends Document {
  name: string
  description?: string
  version: string
  scope: 'county' | 'district' | 'school'
  scopeId?: mongoose.Types.ObjectId // districtId or schoolId if scope is not county
  fields: IFormField[]
  isActive: boolean
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const FormSchemaModel = new Schema<IFormSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    version: {
      type: String,
      required: true,
      default: '1.0.0'
    },
    scope: {
      type: String,
      required: true,
      enum: ['county', 'district', 'school']
    },
    scopeId: {
      type: Schema.Types.ObjectId,
      refPath: 'scope'
    },
    fields: [{
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'email', 'phone', 'date', 'select', 'multiselect', 'checkbox', 'radio', 'textarea', 'file', 'address', 'ssn']
      },
      label: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      placeholder: {
        type: String
      },
      defaultValue: {
        type: Schema.Types.Mixed
      },
      options: [{
        value: { type: String, required: true },
        label: { type: String, required: true }
      }],
      validations: [{
        type: {
          type: String,
          required: true,
          enum: ['required', 'min', 'max', 'pattern', 'minLength', 'maxLength', 'custom']
        },
        value: {
          type: Schema.Types.Mixed
        },
        message: {
          type: String
        }
      }],
      conditionalLogic: [{
        fieldId: { type: String, required: true },
        operator: {
          type: String,
          required: true,
          enum: ['equals', 'not_equals', 'contains', 'greater_than', 'less_than']
        },
        value: {
          type: Schema.Types.Mixed,
          required: true
        },
        action: {
          type: String,
          required: true,
          enum: ['show', 'hide', 'require', 'optional']
        }
      }],
      order: {
        type: Number,
        required: true
      },
      isRequired: {
        type: Boolean,
        default: false
      },
      metadata: {
        type: Schema.Types.Mixed
      }
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

FormSchemaModel.index({ scope: 1, scopeId: 1 })
FormSchemaModel.index({ isActive: 1 })
FormSchemaModel.index({ createdBy: 1 })
FormSchemaModel.index({ name: 1, version: 1 }, { unique: true })

const FormSchema = mongoose.models.FormSchema || mongoose.model<IFormSchema>('FormSchema', FormSchemaModel)
export default FormSchema as mongoose.Model<IFormSchema>
