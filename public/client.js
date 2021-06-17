const client = io();

let txtKey = document.getElementById('txtkey');
let txtValue = document.getElementById('txtvalue');
let btnSend = document.getElementById('send');
let divResult = document.getElementById('result-container');
let txtResult = document.getElementById('textResult');

btnSend.addEventListener('click', function () {
    if (txtKey.value == "") {
        console.log('key must be not empty');
        divResult.style.visibility = "visible"; 
        txtResult.innerHTML = "<b>The key must not be empty </b>"
    }else{
        client.emit('new:keyPair', {
            key: txtKey.value,
            value: txtValue.value
        });
        txtKey.value = "",
        txtValue.value = ""    

        divResult.style.visibility = "visible"; 
        txtResult.innerHTML = "<b>Stored!</b>"
    }

    setTimeout(() => {
        divResult.style.visibility = "hidden"; 
    }, 3000);
})