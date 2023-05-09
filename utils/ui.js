export default {
  updateResult(DOM, value) {
    DOM.result.textContent = value
    // DOM.result.textContent = this.lastResult 
  },
  preventLineWrap(DOM) {
    let previousFontSize = getComputedStyle(DOM.calculation).fontSize 
    if (DOM.calculation.textContent.length > 10 && !(parseInt(DOM.calculation.style.fontSize) < 30)) {
      DOM.calculation.style.fontSize = `${parseInt(previousFontSize)-3}px`
    }
  },
  updateOnDelete(key, STATE, DOM) {
    switch (key) {
      case 'delchar':
        STATE.calculationString = STATE.calculationString.slice(0, -1)
        break;
      case 'C':
        DOM.calculation.textContent = ''
        DOM.result.textContent = ''
        break;
    }
    DOM.calculation.textContent = STATE.calculationString
  }
}
