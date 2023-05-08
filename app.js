import { attachButtonsToDOM } from "./utils/createButtons.js"
import { handleOnKeydown } from "./utils/handleOnKeydown.js"

const elements = {
  buttonContainer: document.querySelector('.button-container'),
  calculation: document.querySelector('.calculation'),
  result: document.querySelector('.result')
}

const state = {
  calculationString: '',
  lastResult: '',
  lastKeyRole: '',
  count: 0,
  operand: 1,
  calculationHistory: [],
  pushNewCalculationObject(operand1) {
    this.calculationHistory.push({
      operand1: operand1,
      operand2: '',
      operator: '',
      completed: false,
      result: ''
    })
  },
  setResult(currentCalc, elements) {
    const { operand1, operand2, operator } = currentCalc
    currentCalc.result = eval(`${operand1}${operator}${operand2}`).toString()
    this.lastResult = currentCalc.result
    elements.result.textContent = this.lastResult 
  }
}

attachButtonsToDOM(elements.buttonContainer)

elements.buttonContainer.addEventListener('click', (e) => { 
  handleOnKeydown(e, state, elements)
  preventLineWrap(elements)
})


function preventLineWrap(elements) {
  let previousFontSize = getComputedStyle(elements.calculation).fontSize 
  if (elements.calculation.textContent.length > 10 && !(parseInt(elements.calculation.style.fontSize) < 30)) {
    elements.calculation.style.fontSize = `${parseInt(previousFontSize)-3}px`
  }

}
