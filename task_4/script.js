let money, time;

function start() {
	money = +prompt("Ваш бюджет на месяц?", "");
	time = +prompt("Введите дату в формате YYYY-MM-DD", "");
	
	while(isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
	savings: true,
	chooseExpenses: function() {
		for (let i = 0; i < 2; i ++) {
			let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
					b = prompt('Во сколько обойдется?', '');
		
			if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50 )  {
					
				console.log('done');	
				appData.expenses[a] = b;
			} else {
				console.log('bad result');
				i--;
			}    
		}
	},
	detectDayBudget: function() {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		alert(`ежедневный бюджет ${appData.moneyPerDay}`);
	},
	detectLevel: function() {
		if (appData.moneyPerDay < 100) {
			console.log('Минимальный уровень достатка');
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log('Средний уровень достатка');
		} else if (appData.moneyPerDay > 2000) {
			console.log('Высокий уровень достатка');
		} else {
			console.log('Ошибка блеа!!!');
		}
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
		for (let i = 0; i < 3; i ++) {
			let question = prompt('Статья необязательных расходов?', '');
	
			console.log('done');	
			appData.optionalExpenses[i+1] = question;
		}
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