import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import type { Toast, ToastContextType } from '../types/toast.types'
import { generateId } from '@utils/helpers'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 5000) => {
      const id = generateId()
      const toast: Toast = { id, message, type, duration }

      setToasts((prev) => [...prev, toast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [removeToast]
  )

  const success = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'success', duration),
    [addToast]
  )

  const error = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'error', duration),
    [addToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) =>
      addToast(message, 'warning', duration),
    [addToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  )

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
