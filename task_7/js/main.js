const startButton = document.getElementById('start'),
  budgetValue = document.querySelector('.budget-value'),
  expensesValue = document.querySelector('.expenses-value'),
  expenseItems = document.querySelectorAll('.expenses-item'),
  expensesButton = document.querySelector('.expenses-item-btn'),
  optionalExpensesButton = document.querySelector('.optionalexpenses-btn'),
  optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
  countButton = document.querySelector('.count-budget-btn'),
  dayBudgetValue = document.querySelector('.daybudget-value'),
  levelValue = document.querySelector('.level-value'),
  optionalExpenses = document.querySelectorAll('.optionalexpenses-item'),
  savings = document.querySelector('#savings'),
  sum = document.querySelector('.choose-sum'),
  percent = document.querySelector('.choose-percent'),
  possibleIncome = document.querySelector('.choose-income'),
  year = document.querySelector('.year-value'),
  month = document.querySelector('.month-value'),
  day = document.querySelector('.day-value');

let money, time;

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
  appData.moneyPerDay = (appData.budget / 30).toFixed();
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
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: [],
    income: [],
	savings: true,
	chooseExpenses: function() {
		
	},
	detectDayBudget: function() {
		
		alert(`ежедневный бюджет ${appData.moneyPerDay}`);
	},
	detectLevel: function() {
		
	},
	checkSavings: function() {
		if (appData.savings) {
			let save = +prompt("Какова сумма накоплений?", ""),
					percent = +prompt("Под какой процент?", "");
	
			appData.monthIncome = save/100/12*percent;
			alert(`доход в месяц с вашего депозита: ${appData.monthIncome}`);
		}
	},
	chooseOptExpenses: function() {
		
	},
	chooseIncome: function() {
		let items = prompt("Что принесет дополнительный доход? (перечислить через запятую)", "");

		while(typeof(items) != 'string' || items == '' || typeof(items) == null) {
			items = prompt("Что принесет дополнительный доход? (перечислить через запятую)", "");
		}

		appData.income = items.split(", ");
		appData.income.push(prompt("Может что-то еще?", ""));
		appData.income.sort();

		appData.income.forEach((el, index) => { 
			console.log(`${index + 1}: Способы доп. заработка: ${el}`);
		});
	}
};

for (let key in appData) {
	console.log(`Наша программа включает в себя следующие данные: ${key}`);
}