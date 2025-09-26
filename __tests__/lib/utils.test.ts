import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const isDisabled = false
    
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    )
    
    expect(result).toBe('base-class active-class')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true
    })
    
    expect(result).toBe('class1 class3')
  })

  it('handles mixed input types', () => {
    const result = cn(
      'base',
      ['array1', 'array2'],
      { 'object1': true, 'object2': false },
      'string'
    )
    
    expect(result).toBe('base array1 array2 object1 string')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null, undefined)).toBe('')
  })

  it('handles Tailwind class conflicts correctly', () => {
    // twMerge should resolve conflicts by keeping the last one
    const result = cn('px-2 py-1', 'px-4 py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('handles complex Tailwind class merging', () => {
    const result = cn(
      'bg-red-500 text-white',
      'bg-blue-500 text-black',
      'hover:bg-green-500'
    )
    
    expect(result).toBe('bg-blue-500 text-black hover:bg-green-500')
  })

  it('preserves non-conflicting classes', () => {
    const result = cn('flex items-center', 'justify-center', 'text-lg')
    expect(result).toBe('flex items-center justify-center text-lg')
  })

  it('handles nested arrays and objects', () => {
    const result = cn([
      'class1',
      { 'class2': true, 'class3': false }
    ], 'class4')
    
    expect(result).toBe('class1 class2 class4')
  })
})