import UI from './ui.js'
import { getMatchedOperator } from "./createButtons.js"

export function handleDelete(key, STATE, DOM) {
  const lastStateChar = STATE.calculationString.at(-1)
  const currentCalc = STATE.history[STATE.count]

  key === 'delchar' 
    ? deleteLastCharacter(lastStateChar, currentCalc)
    : STATE.reset()

  UI.updateOnDelete(key, STATE, DOM)
}

function deleteLastCharacter(lastStateChar, currentCalc) {
  let isLastCharANumber = /\d/.test(lastStateChar)

  if (isLastCharANumber) {
    let lastNumber = currentCalc.operand1.at(-1)
    let i = lastNumber === lastStateChar ? 1 : 2
    currentCalc[`operand${i}`] = currentCalc[`operand${i}`].slice(0, -1)
  } else {
    if (currentCalc.operator === getMatchedOperator(lastStateChar)) {
      currentCalc.operator = '' 
    }
    else throw new Error(`${currentCalc.operator} !== ${lastStateChar}`)
  }
}
