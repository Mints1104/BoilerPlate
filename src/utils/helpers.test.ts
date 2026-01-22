import { describe, it, vi, beforeEach, afterEach } from 'vitest'
import { expect } from '@test/setup'
import { formatDate, sleep, debounce, generateId, capitalize } from './helpers'

describe('formatDate', () => {
  it('formats a Date object correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date)
    expect(formatted).toMatch(/January 15, 2024/)
  })

  it('formats a date string correctly', () => {
    const formatted = formatDate('2024-12-25')
    expect(formatted).toMatch(/December 25, 2024/)
  })
})

describe('sleep', () => {
  it('delays execution for specified time', async () => {
    const start = Date.now()
    await sleep(100)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(90)
  })
})

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('delays function execution', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('cancels previous calls when called multiple times', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('passes arguments correctly', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc('hello', 42)
    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledWith('hello', 42)
  })
})

describe('generateId', () => {
  it('generates a unique string ID', () => {
    const id1 = generateId()
    const id2 = generateId()

    expect(id1).toBeTypeOf('string')
    expect(id2).toBeTypeOf('string')
    expect(id1).not.toBe(id2)
  })

  it('generates non-empty IDs', () => {
    const id = generateId()
    expect(id.length).toBeGreaterThan(0)
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('handles already capitalized strings', () => {
    expect(capitalize('World')).toBe('World')
  })

  it('handles single character strings', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world')
  })
})
