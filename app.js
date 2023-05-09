import { attachButtonsToDOM } from "./utils/createButtons.js"
import { handleOnKeydown } from "./utils/handleOnKeydown.js"
import STATE from "./utils/state.js"
import UI from "./utils/ui.js"

const DOM = {
  buttonContainer: document.querySelector('.button-container'),
  calculation: document.querySelector('.calculation'),
  result: document.querySelector('.result')
}

attachButtonsToDOM(DOM.buttonContainer)

DOM.buttonContainer.addEventListener('click', (e) => { 
  handleOnKeydown(e, STATE, DOM)
  UI.preventLineWrap(DOM)
})

