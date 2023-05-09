const BUTTONS = {
  OPERATOR: ['+', '-', '*', '/', '=', '.', '%'],
  DELETE: ['C', 'delchar'],
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
  const id = isOperator ? i+1 : i

  button.className = `${instanceType}${id}` 
  button.dataset.role = instanceType
  button.dataset.id = id
  button.dataset.key = isOperator ? onKeydownArr[i] : i
  button.dataset.symbol = getSymbol(isOperator, onKeydownArr, i)
  button.textContent = getTextContent(isOperator, onKeydownArr, i)

  return button;
}

function getTextContent(isOperator, onKeydownArr, i) {
  if (!isOperator) return i
  if (isOperator) {
    switch (onKeydownArr[i]) {
      case 'C':
      case '.':
        return onKeydownArr[i]

      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
      case '%':
      case 'delchar':
        return ''

      default:
        throw new Error(`unforeseen case: ${onKeydownArr[i]}`);
    }
  }
}

function getSymbol(isOperator, onKeydownArr, i) {
  if (!isOperator) return i
  if (isOperator) {
    switch (onKeydownArr[i]) {
      case 'C':
      case '.':
      case '+':
      case '-':
      case '=':
        return onKeydownArr[i]

      case '*':
      case '/':
      case '%':
        return getMatchedOperator(onKeydownArr[i])

      case 'delchar':
      case 'C':
        return ''

      default:
        throw new Error(`unforeseen case: ${onKeydownArr[i]}`);
    }
  }
}

export function getMatchedOperator(value) {
  if (!value) return 

  const symbols = {
    '*': '×',
    '×': '*',
    '/': '÷',
    '÷': '/',
    '%': '﹪',
    '﹪': '%'
  };

  if (value in symbols) return symbols[value]

  else throw new Error(`unknown value: ${value}`);
}
