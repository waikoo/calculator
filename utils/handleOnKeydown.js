import { getSymbolMini } from "./createButtons.js"

export function handleOnKeydown(e, state, elements) {
  const { operator: value, role, symbol } = e.target.dataset
  if (role === 'number') handleNumber(value, state, elements)
  if (role === 'operator') handleOperator(value, symbol, state, elements)
  if (role === 'delete') handleDelete(value, symbol, state, elements)
  handleResult(state, elements)
  state.lastKeyRole = role
}

function updateState(state) {
  if (!state.calculationHistory) return
  const currentCalc = state.calculationHistory[state.count]
  if (!currentCalc) return

  if (currentCalc.completed) {
    state.count++
    state.pushNewCalculationObject(state.lastResult)
  }
}

function handleResult(state, elements) {
  if (!state.calculationHistory) return
  const currentCalc = state.calculationHistory[state.count]
  if (!currentCalc) return
  
  // calculate result on keydown
  if (currentCalc.operand1 && currentCalc.operand2) {
    state.setResult(currentCalc, elements)
  }
}

function handleNumber(value, state, elements) {
  const currentCalc = state.calculationHistory[state.count];

  currentCalc
    ? handleExistingNumber(currentCalc, state, value)
    : state.pushNewCalculationObject(value);

  state.calculationString += value;
  elements.calculation.textContent = state.calculationString;
}

function handleExistingNumber(currentCalc, state, value) {
  if (currentCalc.operator && currentCalc.operand1 && !currentCalc.operand2) {
    if (!state.lastResult) state.operand++;
  }
  currentCalc['operand' + state.operand] += value
}

function handleOperator(value, symbol, state, elements) {
  if (!state.calculationHistory) return
  const currentCalc = state.calculationHistory[state.count]
  const currentOp = value === symbol ? value : getSymbolMini(value)
  const calcStr = state.calculationString

  // always use the newest operator pressed
  state.calculationString =
    state.lastKeyRole === "operator"
      ? calcStr.slice(0, -1) + currentOp
      : calcStr + currentOp
  elements.calculation.textContent = state.calculationString

  // ensure a calculation to be completed only after a new one is started
  if (state.lastKeyRole !== 'operator' && currentCalc.operand2) {
    state.calculationHistory[state.count].completed = true
    updateState(state)
  }
  state.calculationHistory[state.count].operator = value
}


function handleDelete(value, symbol, state, elements) {
  let {keyDownArray, calculationString, result, lastKeyRole } = state

  if (value === 'delchar' ) {
    // state
    let lastEl = valueArr[valueArr.length-1]
    lastEl = lastEl.slice(0, -1)
    // ui
    calculationString = calcEl.textContent.slice(0, -1)
    calcEl.textContent = calculationString
  } else if (value === 'C') {
    state.calculationString = ''
    state.lastResult = ''
    state.lastKeyRole = ''
    state.count = 0
    state.operand = 1
    state.calculationHistory = []
    elements.calculation.textContent = ''
    elements.result.textContent = ''
  }
}

