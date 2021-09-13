import React from 'react'
import {
  cleanup, fireEvent, render, screen,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { numbers, operations } from './utils'
import { reducer } from '../../reducer'
import { enhancer } from '../../store'
import CalculatorContainer from '../CalculatorContainer'

const setup = (state = {}) => {
  cleanup()
  const store = createStore(reducer, state, enhancer)
  const container = render(
    <Provider store={store}>
      <CalculatorContainer />
    </Provider>,
  )
  const input = container.getByTestId('result')
  return {
    store,
    input,
    ...container,
  }
}
describe('[Calculators]', () => {
  describe('display all numbers with mouse', () => {
    numbers.forEach((number) => {
      test(`display ${number}`, () => {
        const { input } = setup()

        fireEvent.click(screen.getByText(number, { selector: '[role="button"]' }))
        expect(input.value).toBe(number)
      })
    })
  })

  describe('display all numbers with keyboard', () => {
    numbers.forEach((number) => {
      test(`display ${number}`, () => {
        const { input } = setup()

        fireEvent.keyDown(input, { key: number })
        expect(input.value).toBe(number)
      })
    })
  })

  describe('other tests', () => {
    test('display number concated', () => {
      const { input } = setup()
      fireEvent.click(screen.getByText('1', { selector: '[role="button"]' }))
      fireEvent.click(screen.getByText('2', { selector: '[role="button"]' }))
      expect(input.value).toBe('12')
    })
  })

  describe('operations with mouse', () => {
    operations.forEach(({
      val1, val2, operation, result,
    }) => {
      test(`Calculate ${val1} ${operation} ${val2} = ${result}`, () => {
        const { input } = setup()

        val1.split('').forEach((number) => {
          const btn = screen.queryByText(number, { selector: '[role="button"]' })
          btn && fireEvent.click(btn)
        })
        fireEvent.click(screen.getByText(operation, { selector: '[role="button"]' }))
        val2.split('').forEach((number) => {
          const btn = screen.queryByText(number, { selector: '[role="button"]' })
          btn && fireEvent.click(btn)
        })
        fireEvent.click(screen.getByText('=', { selector: '[role="button"]' }))

        expect(input.value).toBe(result)
      })
    })
  })

  describe('operations with keyboard', () => {
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

  describe('Number rotation', () => {
    test('Click one time', () => {
      const { input } = setup()
      fireEvent.keyDown(input, { key: '1' })
      fireEvent.keyDown(input, { key: '2' })
      fireEvent.keyDown(input, { key: '3' })
      fireEvent.keyDown(input, { key: '4' })

      fireEvent.click(screen.getByText('ROT', { selector: '[role="button"]' }))

      expect(input.value).toBe('2341')
    })
    test('Click 3 times', () => {
      const { input } = setup()
      fireEvent.keyDown(input, { key: '1' })
      fireEvent.keyDown(input, { key: '2' })
      fireEvent.keyDown(input, { key: '3' })
      fireEvent.keyDown(input, { key: '4' })
      const btn = screen.getByText('ROT', { selector: '[role="button"]' })
      fireEvent.click(btn)
      fireEvent.click(btn)
      fireEvent.click(btn)
      expect(input.value).toBe('4123')
    })
  })

  describe('Record', () => {
    test('Calculate 22 + 2 = 24', () => {
      setup()
      const btn2 = screen.queryByRole('button', { name: '2' })
      fireEvent.click(btn2)
      fireEvent.click(btn2)
      fireEvent.click(screen.getByText('+', { selector: '[role="button"]' }))
      fireEvent.click(btn2)
      fireEvent.click(screen.getByText('=', { selector: '[role="button"]' }))

      return screen.findByText('22 + 2 = 24').then((element) => {
        expect(element).toBeInTheDocument()
      })
    })

    test('Calculate 2 operations, view last result', () => {
      setup()
      const btn2 = screen.queryByRole('button', { name: '2' })
      fireEvent.click(btn2)
      fireEvent.click(btn2)
      fireEvent.click(screen.getByText('+', { selector: '[role="button"]' }))
      fireEvent.click(btn2)
      fireEvent.click(screen.getByText('=', { selector: '[role="button"]' }))

      fireEvent.click(screen.getByText('+', { selector: '[role="button"]' }))
      fireEvent.click(btn2)
      fireEvent.click(screen.getByText('=', { selector: '[role="button"]' }))

      return screen.findByText('24 + 2 = 26').then((element) => {
        expect(element).toBeInTheDocument()
      })
    })
  })
  describe('MEM', () => {
    test('Save and show simple number', () => {
      const { input } = setup()
      fireEvent.keyDown(input, { key: '1' })
      fireEvent.keyDown(input, { key: '2' })

      fireEvent.click(screen.getByText('M+', { selector: '[role="button"]' }))
      fireEvent.click(screen.getByText('C', { selector: '[role="button"]' }))
      expect(input.value).toBe('')
      fireEvent.click(screen.getByText('MR', { selector: '[role="button"]' }))
      expect(input.value).toBe('12')
    })
    test('Do operation with MR', () => {
      const { input } = setup()
      fireEvent.keyDown(input, { key: '2' })
      fireEvent.click(screen.getByText('M+', { selector: '[role="button"]' }))
      fireEvent.click(screen.getByText('C', { selector: '[role="button"]' }))
      fireEvent.keyDown(input, { key: '1' })
      fireEvent.keyDown(input, { key: '2' })
      fireEvent.keyDown(input, { key: '*' })
      fireEvent.click(screen.getByText('MR', { selector: '[role="button"]' }))
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(input.value).toBe('24')
    })
    test('Reset MR', () => {
      const { input } = setup()
      fireEvent.keyDown(input, { key: '2' })
      fireEvent.click(screen.getByText('M+', { selector: '[role="button"]' }))
      fireEvent.click(screen.getByText('M-', { selector: '[role="button"]' }))
      fireEvent.click(screen.getByText('MR', { selector: '[role="button"]' }))
      expect(input.value).toBe('0')
    })
  })
})
