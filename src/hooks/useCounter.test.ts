import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('initializes with default value of 0', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it('increments the count', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('decrements the count', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(10))

    act(() => {
      result.current.increment()
      result.current.increment()
    })

    expect(result.current.count).toBe(12)

    act(() => {
      result.current.reset()
    })

    expect(result.current.count).toBe(10)
  })

  it('sets a specific value', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.setValue(42)
    })

    expect(result.current.count).toBe(42)
  })

  it('handles multiple operations correctly', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.decrement()
      result.current.setValue(100)
      result.current.decrement()
    })

    expect(result.current.count).toBe(99)
  })
})
