# Testing Guide

This boilerplate includes a complete testing setup using Vitest and React Testing Library.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- **Component Tests**: `*.test.tsx` - Tests for React components
- **Hook Tests**: `*.test.ts` - Tests for custom hooks
- **Utility Tests**: `*.test.ts` - Tests for utility functions

## Test Utilities

The `src/test/test-utils.tsx` file provides a custom render function that includes common providers (like Router). Import from here instead of `@testing-library/react`:

```tsx
import { render, screen } from '@/test/test-utils'
```

## Example Tests

See the following files for examples:

- [src/components/ui/Button.test.tsx](src/components/ui/Button.test.tsx) - Component testing
- [src/hooks/useCounter.test.ts](src/hooks/useCounter.test.ts) - Hook testing
- [src/utils/helpers.test.ts](src/utils/helpers.test.ts) - Utility function testing

## Writing Tests

### Component Test Example

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Hook Test Example

```tsx
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from './useMyHook'

describe('useMyHook', () => {
  it('works correctly', () => {
    const { result } = renderHook(() => useMyHook())
    act(() => {
      result.current.doSomething()
    })
    expect(result.current.value).toBe(expected)
  })
})
```

## Coverage

Coverage reports are generated in the `coverage` directory when running `npm run test:coverage`.
