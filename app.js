const buttons = document.querySelectorAll('.btn-wrapper');
const operand = document.querySelector('.operand');
const opLog = document.querySelector('.operation');

let operand1;
let operand2;

const opType = {
	add: false,
	subtract: false,
	multiply: false,
	divide: false
};

function clickHandler(e) {
	let number = e.target.dataset.num;
	let operation = e.target.dataset.op;
	let equals = e.target.dataset.equals;
	let del = e.target.dataset.del;
	let type;

	if (e.target.dataset.val === '%') {
		const firstValue = opLog.textContent.match(/[\d]+/);
		const secondValue = operand.textContent;
		opLog.textContent = (firstValue * secondValue) / 100;
	}

	if (e.target.dataset.val === '.') {
		operand.textContent = operand.textContent + '.';
		opLog.textContent = opLog.textContent + '.';
	}

	if (number) {
		if (operand.textContent === '0') {
			operand.textContent = number;
			opLog.textContent = number;
		} else {
			operand.textContent = operand.textContent + number;
			opLog.textContent = opLog.textContent + number;
		}
	}

	if (operation) {
		switch (operation) {
			case '+':
				opType.add = true;
				type = '+';
				break;
			case '-':
				opType.subtract = true;
				type = '-';
				break;
			case '*':
				opType.multiply = true;
				type = '*';
				break;
			default:
				opType.divide = true;
				type = '/';
				break;
		}
		console.log(opType);
		// Number()
		operand1 = parseFloat(operand.textContent);
		// console.log(`rogton reg utan: ${operand1}`);
		opLog.textContent = opLog.textContent + operation;
		operand.textContent = '';
		return operand1;
	}

	if (equals) {
		// console.log(opType);

		// Number()
		operand2 = parseFloat(operand.textContent);
		// ! //////////////////////////////////

		const idk = eval(String(opLog.textContent));
		operand.textContent = idk;
		// if (opLog.textContent.charAt(opLog.textContent.length - 1) === '%') {

		// }
	}

	if (del) {
		if (del === 'C') {
			operand.textContent = '0';
			opLog.textContent = '0';
		} else if (del === 'CE') {
			if (operand.textContent === '') {
				operand.textContent = '0';
				opLog.textContent = '0';
			} else {
				const substring = operand.textContent.substring(
					0,
					operand.textContent.length - 1
				);
				operand.textContent = substring;
			}
		}
	}
}

// Add event listeners to buttons
for (let button of buttons) {
	button.addEventListener('click', clickHandler);
}
