const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const historyList = document.querySelector('.history-list');

let expression = '';

function updateDisplay() {
  display.value = expression;
}

function evaluateExpression() {
  try {
    const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    const result = eval(sanitized);
    addToHistory(expression + ' = ' + result);
    expression = result.toString();
    updateDisplay();
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      expression = '';
    } else if (button.classList.contains('equals')) {
      evaluateExpression();
      return;
    } else if (button.classList.contains('backspace')) {
      expression = expression.slice(0, -1);
    } else {
      expression += value;
    }

    updateDisplay();
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    expression += key;
  } else if (key === 'Enter') {
    evaluateExpression();
    return;
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key === 'Escape') {
    expression = '';
  }

  updateDisplay();
});
