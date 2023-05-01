const BUTTONS = {
    OPERATOR: ['+', '-', '*', '/', '=', '.', '%'],
    DELETE: ['C', '⌫'],
    NUMBER_OF_NUMBERS: 10
}

export function attachButtonsToDOM(buttonsEl) {
  buttonsEl.append(
   ...getNodeArray('number'),
   ...getNodeArray('operator', BUTTONS.OPERATOR),
   ...getNodeArray('delete', BUTTONS.DELETE)
  )
}

function getNodeArray(type, onKeydownArr) {
  let nodeArray = [];
  const length = onKeydownArr ? onKeydownArr.length : BUTTONS.NUMBER_OF_NUMBERS
  for (let i = 0; i < length; i++) {
    nodeArray = [
      ...nodeArray, 
      getButton(type, onKeydownArr, i)
    ];
  }
  return nodeArray
}

function getButton(instanceType, onKeydownArr, i) { 
  const button = document.createElement('button');

  const isOperator = instanceType !== 'number'  
  button.className = `${instanceType}${isOperator ? i+1 : i}` 
  button.dataset.role = instanceType 
  button.dataset.id = isOperator ? i+1 : i
  button.textContent =
    isOperator ? onKeydownArr[i] : i 
  button.dataset.onkeydown = isOperator ? onKeydownArr[i] : i

  return button;
}
