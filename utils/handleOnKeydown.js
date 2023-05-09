import { handleNumber } from "./handleNumber.js"
import { handleOperator } from "./handleOperator.js"
import { handleDelete } from "./handleDelete.js"
import UI from './ui.js'

const handle = {
  number: handleNumber,
  operator: handleOperator,
  delete: handleDelete
}

export function handleOnKeydown(e, STATE, DOM) {
  const { key, role, symbol } = e.target.dataset

  handle[role](key, STATE, DOM, symbol)
  handleResult(STATE, DOM)
  STATE.lastKeyRole = role
}

function handleResult(STATE, DOM) {
  if (!STATE.history) return
  const currentCalc = STATE.history[STATE.count]
  if (!currentCalc) return

  // calculate result on keydown
  if (currentCalc.operand1 && currentCalc.operand2) {
    STATE.setResult(currentCalc)
    UI.updateResult(DOM, STATE.lastResult)
  }

  if (currentCalc.operand1 && currentCalc.operator && !currentCalc.operand2) {
    // make distinction between forward & backward
    // STATE.setResult(currentCalc, '') // setResult to empty string when no op2
    UI.updateResult(DOM, currentCalc.result)
  }
  console.table(currentCalc)
}
