// Form validation utilities

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean
  message?: string
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule
}

export interface ValidationErrors {
  [fieldName: string]: string
}

/**
 * Validates a single field against a rule
 */
export const validateField = (
  value: string,
  rule: ValidationRule,
  fieldName: string
): string | null => {
  // Required check
  if (rule.required && (!value || value.trim() === '')) {
    return rule.message || `${fieldName} is required`
  }

  // If not required and empty, skip other validations
  if (!value || value.trim() === '') {
    return null
  }

  // Min length check
  if (rule.minLength && value.length < rule.minLength) {
    return (
      rule.message ||
      `${fieldName} must be at least ${rule.minLength} characters`
    )
  }

  // Max length check
  if (rule.maxLength && value.length > rule.maxLength) {
    return (
      rule.message ||
      `${fieldName} must be no more than ${rule.maxLength} characters`
    )
  }

  // Pattern check
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message || `${fieldName} format is invalid`
  }

  // Custom validation
  if (rule.custom && !rule.custom(value)) {
    return rule.message || `${fieldName} is invalid`
  }

  return null
}

/**
 * Validates all fields against rules
 */
export const validateForm = (
  formData: Record<string, string>,
  rules: ValidationRules
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {}

  Object.keys(rules).forEach((fieldName) => {
    const value = formData[fieldName] || ''
    const error = validateField(value, rules[fieldName], fieldName)

    if (error) {
      errors[fieldName] = error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Common validation rules
 */
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^[\d\s\-+()]+$/,
    minLength: 10,
    message: 'Please enter a valid phone number',
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid name',
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters',
  },
}
