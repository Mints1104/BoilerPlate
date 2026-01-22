import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

/**
 * Centralized API client with interceptors
 * Handles authentication, error handling, and retries
 */
class ApiClient {
  private client: AxiosInstance
  private authToken: string | null = null

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.authToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.authToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor - Handle errors and retries
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          // Trigger token refresh logic here
          // For now, just clear the token
          this.clearAuth()

          // You can emit an event or call a callback here
          // to notify the app that authentication failed
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('auth:expired'))
          }

          return Promise.reject(error)
        }

        // Handle network errors with retry
        if (!error.response && !originalRequest._retryCount) {
          originalRequest._retryCount = 0
        }

        if (
          !error.response &&
          originalRequest._retryCount < 3 &&
          originalRequest.method?.toLowerCase() === 'get'
        ) {
          originalRequest._retryCount++
          const delay = Math.min(
            1000 * Math.pow(2, originalRequest._retryCount),
            5000
          )
          await new Promise((resolve) => setTimeout(resolve, delay))
          return this.client(originalRequest)
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * Set authentication token
   */
  setAuth(token: string) {
    this.authToken = token
    localStorage.setItem('authToken', token)
  }

  /**
   * Clear authentication token
   */
  clearAuth() {
    this.authToken = null
    localStorage.removeItem('authToken')
  }

  /**
   * Load auth token from storage
   */
  loadAuth() {
    const token = localStorage.getItem('authToken')
    if (token) {
      this.authToken = token
    }
    return token
  }

  /**
   * GET request
   */
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  /**
   * Get the underlying axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.client
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// Load auth token on initialization
apiClient.loadAuth()

export default apiClient
