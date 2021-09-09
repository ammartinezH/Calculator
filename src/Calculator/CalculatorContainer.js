import { connect } from 'react-redux'
import { getLastOperation } from '../store/calculator/reducers'
import { addOperation } from '../store/calculator/actions'
import Calculator from './Calculator'

const mapStateToProps = (state) => ({
  lastOperation: getLastOperation(state),
})

const mapDispatchToProps = (dispatch) => ({
  addOperationToHistory: (operation) => dispatch(addOperation(operation)),
})

const CalculatorContainer = connect(mapStateToProps, mapDispatchToProps)(Calculator)

export default CalculatorContainer
