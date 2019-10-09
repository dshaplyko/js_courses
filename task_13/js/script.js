window.addEventListener('DOMContentLoaded', () => {

  'use strict';
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent'),
      descriptionBtns = document.querySelectorAll('.description-btn');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', () => {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // Timer
  let deadline = '2019-10-5';

  function getTimeRemaining(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }; 
  }

  function setClock(id, endTime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);
    
    function updateClock() {
      let t = getTimeRemaining(endTime);

      function addZero(num) {
        if (num <= 9 ) {
          return '0' + num;
        } else {
          return num;
        }
      }

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

  }

  setClock('timer', deadline);

  //modal
  let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  function showModal() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }
  
  more.addEventListener('click', showModal);

  for (let btn of descriptionBtns) {
    btn.addEventListener('click', showModal);
  }
  
  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  let message = {
    loading: 'Loading...',
    success: 'Thank you. We will contact you soon',
    failure: 'Something went wrong'
  };

  let form = document.querySelector('.main-form'),
      inputs = form.querySelectorAll('input'),
      statusMessage = document.createElement('div');
      
  statusMessage.classList.add('status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.appendChild(statusMessage);
    let formData = new FormData(form);

    let obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    function postData(data) {
      return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        request.onreadystatechange = () => {
          if (request.readyState < 4) {
            resolve();
          } else if ( request.readyState === 4 && request.status == 200 ) {
            resolve();
          } else {
            reject();
          }
        };
        request.send(data);
      });
    }

    function clearInput() {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    }

    postData(json)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(clearInput);
  });
});