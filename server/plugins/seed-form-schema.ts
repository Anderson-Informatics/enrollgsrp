import mongoose from 'mongoose'
import FormSchema from '../models/FormSchema'

export default defineNitroPlugin(async () => {
  try {
    // Check if county intake form already exists
    const existing = await FormSchema.findOne({ name: 'Wayne County Pre-K Intake Form', scope: 'county' })
    if (existing) {
      console.log('[seed] County intake form schema already exists')
      return
    }

    // Create default county intake form schema
    const countyIntakeForm = {
      name: 'Wayne County Pre-K Intake Form',
      description: 'Standard county-wide Pre-K enrollment application form',
      version: '1.0.0',
      scope: 'county' as const,
      fields: [
        {
          id: 'child_first_name',
          type: 'text' as const,
          label: 'Child First Name',
          isRequired: true,
          order: 1,
          validations: [{ type: 'required' as const, message: 'Child first name is required' }]
        },
        {
          id: 'child_last_name',
          type: 'text' as const,
          label: 'Child Last Name',
          isRequired: true,
          order: 2,
          validations: [{ type: 'required' as const, message: 'Child last name is required' }]
        },
        {
          id: 'child_date_of_birth',
          type: 'date' as const,
          label: 'Child Date of Birth',
          isRequired: true,
          order: 3,
          validations: [{ type: 'required' as const, message: 'Date of birth is required' }]
        },
        {
          id: 'child_gender',
          type: 'select' as const,
          label: 'Child Gender',
          isRequired: true,
          order: 4,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'non_binary', label: 'Non-binary' },
            { value: 'prefer_not_to_say', label: 'Prefer not to say' }
          ],
          validations: [{ type: 'required' as const, message: 'Gender is required' }]
        },
        {
          id: 'child_race',
          type: 'multiselect' as const,
          label: 'Child Race (select all that apply)',
          isRequired: true,
          order: 5,
          options: [
            { value: 'american_indian', label: 'American Indian or Alaska Native' },
            { value: 'asian', label: 'Asian' },
            { value: 'black', label: 'Black or African American' },
            { value: 'hispanic', label: 'Hispanic or Latino' },
            { value: 'native_hawaiian', label: 'Native Hawaiian or Other Pacific Islander' },
            { value: 'white', label: 'White' },
            { value: 'other', label: 'Other' }
          ],
          validations: [{ type: 'required' as const, message: 'Race selection is required' }]
        },
        {
          id: 'child_ethnicity',
          type: 'select' as const,
          label: 'Child Ethnicity',
          isRequired: true,
          order: 6,
          options: [
            { value: 'hispanic', label: 'Hispanic or Latino' },
            { value: 'not_hispanic', label: 'Not Hispanic or Latino' }
          ],
          validations: [{ type: 'required' as const, message: 'Ethnicity is required' }]
        },
        {
          id: 'iep_status',
          type: 'checkbox' as const,
          label: 'Does the child have an Individualized Education Program (IEP)?',
          isRequired: true,
          order: 7,
          defaultValue: false
        },
        {
          id: 'housing_status',
          type: 'select' as const,
          label: 'Housing Status',
          isRequired: true,
          order: 8,
          options: [
            { value: 'stable', label: 'Stable Housing' },
            { value: 'homeless', label: 'Homeless' },
            { value: 'foster_care', label: 'Foster Care' }
          ],
          validations: [{ type: 'required' as const, message: 'Housing status is required' }]
        },
        {
          id: 'parent_first_name',
          type: 'text' as const,
          label: 'Parent/Guardian First Name',
          isRequired: true,
          order: 9,
          validations: [{ type: 'required' as const, message: 'Parent first name is required' }]
        },
        {
          id: 'parent_last_name',
          type: 'text' as const,
          label: 'Parent/Guardian Last Name',
          isRequired: true,
          order: 10,
          validations: [{ type: 'required' as const, message: 'Parent last name is required' }]
        },
        {
          id: 'parent_email',
          type: 'email' as const,
          label: 'Parent/Guardian Email',
          isRequired: true,
          order: 11,
          validations: [
            { type: 'required' as const, message: 'Email is required' },
            { type: 'pattern' as const, value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Please enter a valid email address' }
          ]
        },
        {
          id: 'parent_phone',
          type: 'phone' as const,
          label: 'Parent/Guardian Phone',
          isRequired: true,
          order: 12,
          validations: [{ type: 'required' as const, message: 'Phone number is required' }]
        },
        {
          id: 'household_size',
          type: 'number' as const,
          label: 'Household Size (including child)',
          isRequired: true,
          order: 13,
          validations: [
            { type: 'required' as const, message: 'Household size is required' },
            { type: 'min' as const, value: 1, message: 'Household size must be at least 1' }
          ]
        },
        {
          id: 'annual_income',
          type: 'number' as const,
          label: 'Annual Household Income',
          isRequired: true,
          order: 14,
          validations: [
            { type: 'required' as const, message: 'Annual income is required' },
            { type: 'min' as const, value: 0, message: 'Income cannot be negative' }
          ]
        },
        {
          id: 'school_preferences',
          type: 'multiselect' as const,
          label: 'School Preferences (select up to 3)',
          isRequired: true,
          order: 15,
          description: 'Select your preferred schools in order of priority',
          validations: [{ type: 'required' as const, message: 'Please select at least one school preference' }]
        }
      ],
      isActive: true,
      createdBy: new mongoose.Types.ObjectId('000000000000000000000000') // System user
    }

    await FormSchema.create(countyIntakeForm)
    console.log('[seed] County intake form schema seeded')
  } catch (err) {
    console.error('[seed] Failed to seed form schema:', err)
  }
})
