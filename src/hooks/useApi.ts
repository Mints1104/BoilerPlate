import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@services/api.service'
import { AxiosError } from 'axios'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  immediate?: boolean
}

export function useApi<T = unknown>(
  url: string,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError, immediate = false } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.get<T>(url)
      setData(result)
      onSuccess?.(result)
      return result
    } catch (err) {
      const error = err as AxiosError
      const errorObj = new Error(error.message)
      setError(errorObj)
      onError?.(errorObj)
      throw error
    } finally {
      setLoading(false)
    }
  }, [url, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  const refetch = execute

  return { data, loading, error, execute, refetch }
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post'
) {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = useCallback(
    async (variables?: TVariables) => {
      try {
        setLoading(true)
        setError(null)

        let result: TData
        if (method === 'delete') {
          result = await apiClient.delete<TData>(url)
        } else {
          result = await apiClient[method]<TData>(url, variables)
        }

        setData(result)
        return result
      } catch (err) {
        const error = err as AxiosError
        const errorObj = new Error(error.message)
        setError(errorObj)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [url, method]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, mutate, reset }
}
