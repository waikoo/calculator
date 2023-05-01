import { attachButtonsToDOM } from "./utils/createButtons.js"
import { handleOnKeydown } from "./utils/handleOnKeydown.js"

const elements = {
  buttonContainer: document.querySelector('.button-container'),
  calculation: document.querySelector('.calculation'),
  result: document.querySelector('.result')
}

const state = {
  keyDownArray: [],
  lastKeyRole: '',
  isOperatorIn: false
}

attachButtonsToDOM(elements.buttonContainer)

elements.buttonContainer.addEventListener('click', (e) => 
  handleOnKeydown(e, state, elements)
)
