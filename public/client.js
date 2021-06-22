const client = io();

const txtKey = document.getElementById('txtkey');
const txtValue = document.getElementById('txtvalue');
const btnSend = document.getElementById('send');
const divResult = document.getElementById('result-container');
const txtResult = document.getElementById('textResult');

btnSend.addEventListener('click', () => {
  if (txtKey.value == '') {
    divResult.style.visibility = 'visible';
    txtResult.innerHTML = '<b>The key must not be empty </b>';
  } else {
    client.emit('new:keyPair', {
      key: txtKey.value,
      value: txtValue.value,
    });
    txtKey.value = '';
    txtValue.value = '';
    divResult.style.visibility = 'visible';
    txtResult.innerHTML = '<b>Stored!</b>';
  }

  setTimeout(() => {
    divResult.style.visibility = 'hidden';
  }, 3000);
});
