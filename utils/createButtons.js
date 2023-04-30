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

function getNodeArray(type, iconsArray) {
  let nodeArray = [];
  const length = iconsArray ? iconsArray.length : BUTTONS.NUMBER_OF_NUMBERS
  for (let i = 0; i < length; i++) {
    nodeArray = [
      ...nodeArray, 
      getButton(type, iconsArray, i)
    ];
  }
  return nodeArray
}

function getButton(instanceType, iconsArray, i) { 
  const button = document.createElement('button');

  const isOperator = instanceType !== 'number'  
  button.className = `${instanceType}${isOperator ? i+1 : i}` 
  button.dataset.role = instanceType 
  button.dataset.id = isOperator ? i+1 : i
  button.textContent =
    isOperator ? iconsArray[i] : i 

  return button;
}
