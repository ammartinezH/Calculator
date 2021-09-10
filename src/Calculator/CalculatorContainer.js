import { connect } from 'react-redux'
import { getLastOperation, getMr } from '../store/calculator/reducers'
import { addM, addOperation, diffM } from '../store/calculator/actions'
import Calculator from './Calculator'

const mapStateToProps = (state) => ({
  lastOperation: getLastOperation(state),
  mr: getMr(state),
})

const mapDispatchToProps = (dispatch) => ({
  addOperationToHistory: (operation) => dispatch(addOperation(operation)),
  addM: (val) => dispatch(addM(val)),
  diffM: (val) => dispatch(diffM(val)),
})

const CalculatorContainer = connect(mapStateToProps, mapDispatchToProps)(Calculator)

export default CalculatorContainer
