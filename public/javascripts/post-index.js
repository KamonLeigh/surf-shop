const clear = document.getElemengById('clear-distance');
clear.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('location').value = '';
    document.querySelector('input[type=radio]:cheched').checked = false;
});