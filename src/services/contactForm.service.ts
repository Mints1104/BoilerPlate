// Contact Form Service - Supports multiple backends
// Choose your backend in .env.local

export type ContactFormProvider =
  | 'formspree'
  | 'getform'
  | 'web3forms'
  | 'custom'
  | 'netlify'
  | 'vercel'

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  [key: string]: string | undefined
}

export interface ContactFormResponse {
  success: boolean
  message: string
  error?: string
}

/**
 * Formspree integration
 * https://formspree.io/
 */
const submitToFormspree = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  const formId = import.meta.env.VITE_FORMSPREE_ID

  if (!formId) {
    throw new Error('Formspree ID not configured')
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  }

  const error = await response.json()
  return {
    success: false,
    message: 'Failed to send message. Please try again.',
    error: error.error || 'Unknown error',
  }
}

/**
 * Getform integration
 * https://getform.io/
 */
const submitToGetform = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  const endpoint = import.meta.env.VITE_GETFORM_ENDPOINT

  if (!endpoint) {
    throw new Error('Getform endpoint not configured')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  }

  return {
    success: false,
    message: 'Failed to send message. Please try again.',
  }
}

/**
 * Web3Forms integration
 * https://web3forms.com/
 */
const submitToWeb3Forms = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

  if (!accessKey) {
    throw new Error('Web3Forms access key not configured')
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      ...data,
    }),
  })

  const result = await response.json()

  if (result.success) {
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  }

  return {
    success: false,
    message: result.message || 'Failed to send message. Please try again.',
  }
}

/**
 * Custom API integration
 */
const submitToCustomAPI = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL

  if (!apiUrl) {
    throw new Error('Custom API URL not configured')
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    }
  }

  const result = await response.json()
  return {
    success: true,
    message:
      result.message || 'Thank you! Your message has been sent successfully.',
  }
}

/**
 * Netlify Forms integration
 * No API call needed - form submits directly to Netlify
 */
const submitToNetlify = async (
  _data: ContactFormData
): Promise<ContactFormResponse> => {
  // This is handled by the form itself with data-netlify="true"
  // This function exists for consistency
  return {
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
  }
}

/**
 * Main contact form submission handler
 */
export const submitContactForm = async (
  data: ContactFormData,
  provider: ContactFormProvider = 'formspree'
): Promise<ContactFormResponse> => {
  try {
    switch (provider) {
      case 'formspree':
        return await submitToFormspree(data)
      case 'getform':
        return await submitToGetform(data)
      case 'web3forms':
        return await submitToWeb3Forms(data)
      case 'custom':
        return await submitToCustomAPI(data)
      case 'netlify':
        return await submitToNetlify(data)
      default:
        throw new Error(`Unknown provider: ${provider}`)
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
