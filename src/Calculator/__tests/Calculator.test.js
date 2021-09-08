import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Calculator from '../Calculator'

const setup = () => {
  const container = render(<Calculator />)
  const input = container.getByTestId('result')
  return {
    input,
    ...container,
  }
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
describe('[Calculators] display all numbers with mouse', () => {
  numbers.forEach((number) => {
    test(`display ${number}`, () => {
      const { input } = setup()

      fireEvent.click(screen.getByRole('button', { name: number }))
      expect(input.value).toBe(number)
    })
  })
})

describe('[Calculators] display all numbers with keyboard', () => {
  numbers.forEach((number) => {
    test(`display ${number}`, () => {
      const { input } = setup()

      fireEvent.keyDown(input, { key: number })
      expect(input.value).toBe(number)
    })
  })
})

describe('[Calculators] other tests', () => {
  test('display number concated', () => {
    const { input } = setup()
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    expect(input.value).toBe('12')
  })
})

const operations = [
  {
    val1: '12', val2: '21', operation: '+', result: '33',
  },
  {
    val1: '2', val2: '1', operation: '-', result: '1',
  },
  {
    val1: '7', val2: '2', operation: '*', result: '14',
  },
  {
    val1: '12', val2: '2', operation: '/', result: '6',
  },
  {
    val1: '2', val2: '3', operation: '-', result: '-1',
  },
  {
    val1: '-10', val2: '5', operation: '-', result: '-15',
  },
  {
    val1: '-10', val2: '5', operation: '+', result: '-5',
  },
  {
    val1: 'asdf-10', val2: 'asdf5', operation: '+', result: '-5',
  }]
describe('[Calculators] operations with mouse', () => {
  operations.forEach(({
    val1, val2, operation, result,
  }) => {
    test(`Calculate ${val1} ${operation} ${val2} = ${result}`, () => {
      const { input } = setup()

      val1.split('').forEach((number) => {
        const btn = screen.queryByRole('button', { name: number })
        btn && fireEvent.click(btn)
      })
      fireEvent.click(screen.getByRole('button', { name: operation }))
      val2.split('').forEach((number) => {
        const btn = screen.queryByRole('button', { name: number })
        btn && fireEvent.click(btn)
      })
      fireEvent.click(screen.getByRole('button', { name: '=' }))

      expect(input.value).toBe(result)
    })
  })
})

describe('[Calculators] operations with keyboard', () => {
  operations.forEach(({
    val1, val2, operation, result,
  }) => {
    test(`Calculate ${val1} ${operation} ${val2} = ${result}`, () => {
      const { input } = setup()

      val1.split('').forEach((number) => {
        fireEvent.keyDown(input, { key: number })
      })
      fireEvent.keyDown(input, { key: operation })
      val2.split('').forEach((number) => {
        fireEvent.keyDown(input, { key: number })
      })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      expect(input.value).toBe(result)
    })
  })
})

describe('[Calculators] Number rotation', () => {
  test('Click one time', () => {
    const { input } = setup()
    fireEvent.keyDown(input, { key: '1' })
    fireEvent.keyDown(input, { key: '2' })
    fireEvent.keyDown(input, { key: '3' })
    fireEvent.keyDown(input, { key: '4' })

    const btn = screen.getByRole('button', { name: /^ROT$/i })

    fireEvent.click(btn)
    expect(input.value).toBe('2341')
  })
  test('Click 3 times', () => {
    const { input } = setup()
    fireEvent.keyDown(input, { key: '1' })
    fireEvent.keyDown(input, { key: '2' })
    fireEvent.keyDown(input, { key: '3' })
    fireEvent.keyDown(input, { key: '4' })
    const btn = screen.getByRole('button', { name: /^ROT$/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(input.value).toBe('4123')
  })
})
