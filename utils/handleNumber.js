export function handleNumber(key, STATE, DOM) {
  const currentCalc = STATE.history[STATE.count];

  currentCalc
    ? handleExistingNumber(currentCalc, STATE, key)
    : STATE.addCalculationObject(key);

  STATE.calculationString += key;
  DOM.calculation.textContent = STATE.calculationString;
}

function handleExistingNumber(currentCalc, STATE, key) {
  if (currentCalc.operator && currentCalc.operand1 && !currentCalc.operand2) {
    if (!STATE.lastResult) STATE.operand++;
  }
  currentCalc['operand' + STATE.operand] += key
}
