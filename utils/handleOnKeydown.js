export function handleOnKeydown(e, state, elements) {
  let value = e.target.dataset.onkeydown
  const role = e.target.dataset.role

  separateNumbersFromOperators(value, role, state)
  updateUI(value, role, state, elements)
}

function separateNumbersFromOperators(value, role, state) {
  let valueArr = state.keyDownArray
  const addNewValue = () => state.keyDownArray = [...state.keyDownArray, value]
  const itsANumber = () => role === 'number'
  const itsAnOperator = () => role === 'operator'
  const itsADelete = () => role === 'delete'

  if (itsANumber()) {
    if (state.keyDownArray.length === 0) state.keyDownArray[0] = value
    else {
      if (state.lastKeyRole === 'number') {
        valueArr[valueArr.length-1] = `${valueArr.at(-1)}${value}`
      } else {
        valueArr.push(value)
      }
    }
  } else if (itsAnOperator()) {
    if (value === '=') return
    state.lastKeyRole === 'operator' ? valueArr[valueArr.length-1] = value : addNewValue()
  } else if (itsADelete()) {
    addNewValue()
  }

  state.lastKeyRole = role
}

function updateUI(value, role, state, elements) {
  updateCalculation(value, role, state, elements)
  updateResult(value, role, state, elements)
}

function updateResult(value, role, state, elements) {
  console.log('updateResult')
  if (state.keyDownArray.length === 3 || value === '=') {
    const result = getResult(state.keyDownArray)
    elements.result.textContent = result 
    state.keyDownArray = []
    state.keyDownArray[0] = result
    console.log(state.keyDownArray)
  }
}

function updateCalculation(value, role, state, elements) {

  if (role === 'number') { 
    elements.calculation.textContent += value
    state.isOperatorIn = false;
  } else if (role === 'operator') {
    if (value === '=') return
    if (state.isOperatorIn) {
      elements.calculation.textContent = 
      elements.calculation.textContent.slice(0, -1) + value
    } else {
      elements.calculation.textContent += value
    }
    state.isOperatorIn = true
  } 
}

function getResult(arr) {
  let result = eval(arr.join(''))

  // if (!Number.isInteger(result)) {
  // }
  
  return result
}
