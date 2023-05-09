import { getMatchedOperator } from "./createButtons.js"

export function handleOperator(key, STATE, DOM, symbol) {
  if (!STATE.history) return
  const currentCalc = STATE.history[STATE.count]
  const currentOp = key === symbol ? key : getMatchedOperator(key)
  const calcStr = STATE.calculationString

  // always use the newest operator pressed
  STATE.calculationString =
    STATE.lastKeyRole === "operator"
      ? calcStr.slice(0, -1) + currentOp
      : calcStr + currentOp
  DOM.calculation.textContent = STATE.calculationString

  // ensure a calculation to be completed only after a new one is started
  if (STATE.lastKeyRole !== 'operator' && currentCalc.operand2) {
    STATE.history[STATE.count].completed = true
    STATE.incrementHistory()
  }
  STATE.history[STATE.count].operator = key
}
