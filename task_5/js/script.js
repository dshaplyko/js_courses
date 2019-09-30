const ul = document.querySelector('ul'),
    li = document.querySelectorAll('li'),
    newLi = document.createElement('li'),
    title = document.querySelector('#title'),
    adv = document.querySelector('.adv'),
    columns = document.querySelectorAll('.column'),
    promptBlock = document.querySelector('#prompt');


//Восстановить порядок в меню
ul.insertBefore(li[2], li[1]);

//добавить пятый пункт
newLi.textContent = 'Пятый пункт';
newLi.classList.add('menu-item');
ul.appendChild(newLi);

//Заменить картинку заднего фона на другую из папки img
document.body.style.background = 'url(./img/apple_true.jpg)';

//Поменять заголовок, добавить слово "подлинную" ( Получится - "Мы продаем только подлинную технику Apple")
title.textContent = 'Мы продаем только подлинную технику Apple';

//Удалить рекламу со страницы
columns[1].removeChild(adv);

//Спросить у пользователя отношение к технике apple и записать ответ в блок на странице с id "prompt"
let answer = prompt("Каково ваше отношение к технике APPLE?", "");
promptBlock.textContent = answer;