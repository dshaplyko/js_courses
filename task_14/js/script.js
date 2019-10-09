
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

    function getData() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();


            request.onload = function() {
                if(request.readyState === 4) {
                    if(request.status == 200) {
                        resolve(this.response);
                    }
                    else {
                        reject();
                    
                    }
                }
            };            
        });
    }

    getData()
        .then(response => {
            let data = JSON.parse(response);
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(() => inputUsd.value = "Что-то пошло не так");
    
});