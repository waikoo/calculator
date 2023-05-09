export default {
  calculationString: '',
  lastResult: '',
  lastKeyRole: '',
  count: 0,
  operand: 1,
  history: [],
  addCalculationObject(operand1) {
    this.history.push({
      operand1: operand1,
      operand2: '',
      operator: '',
      completed: false,
      result: ''
    })
  },
  incrementHistory() {
    if (!this.history) return
    const currentCalc = this.history[this.count]
    if (!currentCalc) return

    if (currentCalc.completed) {
      this.count++
      this.addCalculationObject(this.lastResult)
    }
  },
  setResult(currentCalc, value) {
    currentCalc.result = value || this.getEvaluation(currentCalc)
    this.lastResult = currentCalc.result
  },
  getEvaluation(currentCalc) {
    const { operand1, operand2, operator } = currentCalc
    return eval(`${operand1}${operator}${operand2}`).toString()
  },
  reset() {
    this.calculationString = ''
    this.lastResult = ''
    this.lastKeyRole = ''
    this.count = 0
    this.operand = 1
    this.history = []
  }
}
