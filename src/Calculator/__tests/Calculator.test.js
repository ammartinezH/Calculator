import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Calculator from '../Calculator'
import { numbers, operations } from './utils'

const setup = () => {
  const container = render(<Calculator />)
  const input = container.getByTestId('result')
  return {
    input,
    ...container,
  }
}
describe('[Calculators]', () => {
  describe(' display all numbers with mouse', () => {
    numbers.forEach((number) => {
      test(`display ${number}`, () => {
        const { input } = setup()

        fireEvent.click(screen.getByRole('button', { name: number }))
        expect(input.value).toBe(number)
      })
    })
  })

  describe(' display all numbers with keyboard', () => {
    numbers.forEach((number) => {
      test(`display ${number}`, () => {
        const { input } = setup()

        fireEvent.keyDown(input, { key: number })
        expect(input.value).toBe(number)
      })
    })
  })

  describe(' other tests', () => {
    test('display number concated', () => {
      const { input } = setup()
      fireEvent.click(screen.getByRole('button', { name: '1' }))
      fireEvent.click(screen.getByRole('button', { name: '2' }))
      expect(input.value).toBe('12')
    })
  })

  describe(' operations with mouse', () => {
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

  describe(' operations with keyboard', () => {
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

  describe(' Number rotation', () => {
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
})
