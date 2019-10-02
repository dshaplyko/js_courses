const startButton = document.getElementById('start'),
  budgetValue = document.querySelector('.budget-value'),
  expensesValue = document.querySelector('.expenses-value'),
  expenseItems = document.querySelectorAll('.expenses-item'),
  expensesButton = document.querySelector('.expenses-item-btn'),
  optionalExpensesButton = document.querySelector('.optionalexpenses-btn'),
  optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
  incomeValue = document.querySelector('.income-value'),
  countButton = document.querySelector('.count-budget-btn'),
  dayBudgetValue = document.querySelector('.daybudget-value'),
  levelValue = document.querySelector('.level-value'),
  optionalExpenses = document.querySelectorAll('.optionalexpenses-item'),
  savings = document.querySelector('#savings'),
  sumValue = document.querySelector('.choose-sum'),
  percentValue = document.querySelector('.choose-percent'),
  possibleIncome = document.querySelector('.choose-income'),
  monthSavings = document.querySelector('.monthsavings-value'),
  yearSavings = document.querySelector('.yearsavings-value'),
  year = document.querySelector('.year-value'),
  month = document.querySelector('.month-value'),
  day = document.querySelector('.day-value');

let money, time;

countButton.disabled = true;
expensesButton.disabled = true;
optionalExpensesButton.disabled = true;


startButton.addEventListener('click', () => {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");
	
	while(isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
  }
  
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  year.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth() + 1;
  day.value = new Date(Date.parse(time)).getDate();

  countButton.disabled = false;
  expensesButton.disabled = false;
  optionalExpensesButton.disabled = false;
});

expensesButton.addEventListener('click', () => {
  let sum = 0;

  for (let i = 0; i < expenseItems.length; i ++) {
    let a = expenseItems[i].value,
        b = parseInt(expenseItems[++i].value);
  
    if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50 )  {
        
      console.log('done');	
      appData.expenses[a] = b;
      sum += b;
    } else {
      console.log('bad result');
      i--;
    }    
  }
  expensesValue.textContent = sum;
});

optionalExpensesButton.addEventListener('click', () => {
  for (let i = 0; i < optionalExpenses.length; i ++) {
    let opt = optionalExpenses[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
  
});

countButton.addEventListener('click', () => {
  
  if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'ОШИБКА!!!';
    }
  } else {
    dayBudgetValue.textContent = 'Ошибка. Введите бюджет';
  }
  
});

possibleIncome.addEventListener('input', () => {
  let items = possibleIncome.value;

  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

savings.addEventListener('click', () => {
  if (appData.savings) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener('input', () => {
  if (appData.savings) {
    let sum = sumValue.value,
      percent = percentValue.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed();
  }
});

percentValue.addEventListener('input', () => {
  if (appData.savings) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed();
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: [],
  income: [],
	savings: false	
};

// for (let key in appData) {
// 	console.log(`Наша программа включает в себя следующие данные: ${key}`);
// }