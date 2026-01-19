import { useState } from 'react'
import {
  ContactFormData,
  ContactFormProvider,
  submitContactForm,
} from '@services/contactForm.service'
import { validateForm, commonRules, ValidationErrors } from '@utils/validation'
import {
  sanitizeInput,
  formRateLimiter,
  containsSuspiciousContent,
} from '@utils/security'

interface UseContactFormOptions {
  provider?: ContactFormProvider
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const useContactForm = (options: UseContactFormOptions = {}) => {
  const { provider = 'formspree', onSuccess, onError } = options

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev: ContactFormData) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus({ type: null, message: '' })

    // Rate limiting check
    if (!formRateLimiter.canSubmit('contact-form', 3, 60000)) {
      setSubmitStatus({
        type: 'error',
        message: 'Too many submissions. Please wait a minute and try again.',
      })
      return
    }

    // Security check - scan for suspicious content
    if (containsSuspiciousContent(formData.message)) {
      setSubmitStatus({
        type: 'error',
        message:
          'Your message contains invalid content. Please remove any HTML or scripts.',
      })
      return
    }

    // Validate form
    const validationRules = {
      name: commonRules.name,
      email: commonRules.email,
      message: commonRules.message,
      ...(formData.phone && { phone: commonRules.phone }),
    }

    const validation = validateForm(
      formData as Record<string, string>,
      validationRules
    )

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    try {
      // Sanitize all inputs before sending
      const sanitizedData: ContactFormData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: formData.subject ? sanitizeInput(formData.subject) : undefined,
        message: sanitizeInput(formData.message),
        phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
      }

      const response = await submitContactForm(sanitizedData, provider)

      if (response.success) {
        setSubmitStatus({ type: 'success', message: response.message })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
        })
        onSuccess?.()
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message,
        })
        onError?.(response.error || response.message)
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      })
      onError?.(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
    })
    setErrors({})
    setSubmitStatus({ type: null, message: '' })
  }

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
