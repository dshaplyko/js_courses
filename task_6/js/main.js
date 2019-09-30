//Получить кнопку "Начать расчет" через id
const startButton = document.getElementById('start');

/*Получить все блоки в правой части программы через классы 
(которые имеют класс название-value, начиная с <div class="budget-value"></div> и заканчивая <div class="yearsavings-value"></div>)*/
const values = document.querySelectorAll("div[class*='value']");

//Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)
const inputs = document.querySelectorAll('.expenses-item');

// Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной. 
const approveObligatory = document.querySelector('.expenses-item-btn'),
  approveOptional = document.querySelector('.optionalexpenses-btn'),
  calculate = document.querySelector('.count-budget-btn');

//Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
const optionalExpenses = document.querySelectorAll('.optionalexpenses-item');

//Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
const savings = document.querySelector('#savings'),
  sum = document.querySelector('.choose-sum'),
  percent = document.querySelector('.choose-percent'),
  possibleIncome = document.querySelector('.choose-income'),
  year = document.querySelector('.year-value'),
  month = document.querySelector('.month'),
  day = document.querySelector('.day');