const client = io();

let txtKey = document.getElementById('txtkey');
let txtValue = document.getElementById('txtvalue');
let btnSend = document.getElementById('send');

btnSend.addEventListener('click', function () {
    if (txtKey.value == "") {
        console.log('key must be not empty');
    }
    client.emit('new:keyPair', {
        key: txtKey.value,
        value: txtValue.value
    });
    txtKey.value = "",
    txtValue.value = ""    
})