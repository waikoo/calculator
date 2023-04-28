const BUTTONS = {
    OPERATOR: ['+', '-', '*', '/', '=' ],
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

  button.className = `${instanceType}${i+1}` 
  button.dataset.role = instanceType 
  button.dataset.id = i+1
  button.textContent =
    instanceType !== 'number' ? iconsArray[i] : i 

  return button;
}
